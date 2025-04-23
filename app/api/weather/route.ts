import { type NextRequest, NextResponse } from 'next/server'
import { fetchWeatherApi } from 'openmeteo'

// Helper Functions
// convert weatherData to sms format
function convertDailyDate (date: Date, tz: string): string {
    const day = date.toLocaleDateString('en-us',{weekday:'short', timeZone: tz})
    return day
}
function convertHourlyDate (date: Date, tz: string): string {
    const dayAndHour = date.toLocaleDateString('en-us',{weekday:'short', hour: 'numeric', timeZone: tz})
    return dayAndHour.replace(/(\s|,)/g, "")
}
// convert weather code to readable string
// Code	Description
// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail
function convertWeatherCode (weatherCode: number): string {
    const lookupTable: {[index: number]: string} = {
        0: "Sun",
        1: "MostlySun",
        2: "PartlyCldy",
        3: "Cloudy",
        45: "Fog",
        48: "RimeFog",
        51: "LtDriz",
        53: "MdDriz",
        55: "HvyDriz",
        56: "LtFrzDriz",
        57: "HvyFrzDriz",
        61: "LtRain",
        63: "MdRain",
        65: "HvyRain",
        66: "LtFrzRain",
        67: "HvyFrzRain",
        71: "LtSnow",
        73: "MdSnow",
        75: "HvySnow",
        77: "SnowGrn",
        80: "LtShwr",
        81: "MdShwr",
        82: "HvyShwr",
        85: "LtSnowShwr",
        86: "HvySnowShwr",
        95: "LtThndr",
        96: "LtThndrHail",
        97: "HvyThndrHail",
    }
    return lookupTable[weatherCode]
}
// convert wind degrees to compass direction
function convertWindDirection (deg: number): string {
    let directions = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"]
    let i = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8
    return String(directions[i])
}

function parseSMS(text: string) {
    // FORMAT
    // accessCode latitude,longitude days interval
    // test 10.3,23.4 3 4
    const values = text.split(" ")
    return {
        accessCode: values[0],
        latitude: Number(values[1].split(",")[0]),
        longitude: Number(values[1].split(",")[1]),
        forecastDays: Number(values[2]),
        hourlyInterval: Number(values[3])
    }
}

async function getTZFromGPS(latitude: number, longitude: number) {
    const response = await fetch(`https://api.geotimezone.com/public/timezone?latitude=${latitude}&longitude=${longitude}`)
    return response.json()
}

async function getDailyWeather(latitude: number, longitude: number, forecast_days: number) {
    //lookup timezone from lat / lon
    const tz = await getTZFromGPS(latitude,longitude)

    const params = {
        latitude,
        longitude,
        "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_probability_max", "weather_code", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant"],
        forecast_days,
        "timezone": tz['iana_timezone'] || null
    }
    const url = "https://api.open-meteo.com/v1/forecast"
    const responses = await fetchWeatherApi(url, params)
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0]
    
    // Attributes for timezone and location
    // const utcOffsetSeconds = response.utcOffsetSeconds()
    const timezone = response.timezone() || "UTC"
    // const timezoneAbbreviation = response.timezoneAbbreviation()
    // const latitude = response.latitude()
    // const longitude = response.longitude()
    
    const daily = response.daily()!
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        daily: {
            time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                (_, i) => new Date((Number(daily.time()) + i * daily.interval()) * 1000)
            ),
            temperature2mMax: daily.variables(0)!.valuesArray()!,
            temperature2mMin: daily.variables(1)!.valuesArray()!,
            precipitation_probability_max: daily.variables(2)!.valuesArray()!,
            weatherCode: daily.variables(3)!.valuesArray()!,
            windSpeed10mMax: daily.variables(4)!.valuesArray()!,
            windGusts10mMax: daily.variables(5)!.valuesArray()!,
            windDirection10mDominant: daily.variables(6)!.valuesArray()!,
        },
    }

    const convertDailyForecastString = (t: Date, i: number) => {
        return convertDailyDate(t, timezone)+
        String(weatherData.daily.temperature2mMax[i].toFixed(0))+
        "H"+
        String(weatherData.daily.temperature2mMin[i].toFixed(0))+
        "L"+
        String(weatherData.daily.precipitation_probability_max[i])+
        "%"+
        convertWeatherCode(weatherData.daily.weatherCode[i])+
        String(weatherData.daily.windSpeed10mMax[i].toFixed(0))+
        convertWindDirection(weatherData.daily.windDirection10mDominant[i])+
        String(weatherData.daily.windGusts10mMax[i].toFixed(0))+
        "\n"
    }

    return weatherData.daily.time.reduce((acc, t, i) => acc+convertDailyForecastString(t,i),`${response.latitude()},${response.longitude()} ${response.elevation()}\n`)
}
async function getHourlyWeather(latitude: number, longitude: number, forecast_days: number, hourlyInterval: number) {
    //lookup timezone from lat / lon
    const tz = await getTZFromGPS(latitude,longitude)

    const params = {
        latitude,
        longitude,
        "hourly": ["temperature_2m", "precipitation_probability", "precipitation", "weather_code", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
        forecast_days,
        "timezone": tz['iana_timezone'] || null
    };
    const url = "https://api.open-meteo.com/v1/forecast"
    const responses = await fetchWeatherApi(url, params)
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0]
    
    // Attributes for timezone and location
    // const utcOffsetSeconds = response.utcOffsetSeconds()
    const timezone = response.timezone() || "UTC"
    // const timezoneAbbreviation = response.timezoneAbbreviation()
    // const latitude = response.latitude()
    // const longitude = response.longitude()
    
    const hourly = response.hourly()!
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval()) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            precipitationProbability: hourly.variables(1)!.valuesArray()!,
            precipitation: hourly.variables(2)!.valuesArray()!,
            weatherCode: hourly.variables(3)!.valuesArray()!,
            windSpeed10m: hourly.variables(4)!.valuesArray()!,
            windDirection10m: hourly.variables(5)!.valuesArray()!,
            windGusts10m: hourly.variables(6)!.valuesArray()!,
        },
    };


    const convertHourlyForecastString = (t: Date, i: number) => {
        // use hourlyInterval to return every X hours
        // not using getHour because it doesn't use timezone
        if (Number(t.toLocaleTimeString('en-us',{hour: '2-digit', timeZone: timezone}).slice(0,2)) % hourlyInterval === 0) {
            return convertHourlyDate(t, timezone)+
            String(weatherData.hourly.temperature2m[i].toFixed(0))+
            "*"+
            String(weatherData.hourly.precipitationProbability[i].toFixed(0))+
            "%"+
            String(weatherData.hourly.precipitation[i].toFixed(2))+
            convertWeatherCode(weatherData.hourly.weatherCode[i])+
            String(weatherData.hourly.windSpeed10m[i].toFixed(0))+
            convertWindDirection(weatherData.hourly.windDirection10m[i])+
            String(weatherData.hourly.windGusts10m[i].toFixed(0))+
            "\n"
        } else {
            return ""
        }
    }

    return weatherData.hourly.time.reduce((acc, t, i) => acc+convertHourlyForecastString(t,i),`${response.latitude()},${response.longitude()} ${response.elevation()}\n`)
}

export async function GET(req: NextRequest) {
    try {
        // set accessCode lat lon forecastDays defaults
        let latitude = 50
        let longitude = 50
        let forecastDays = 5
        let hourlyInterval = 0
        let accessCode = ""

        // get accessCode lat lon forecastDays from request
        const text = req.nextUrl.searchParams.get("Body")
        if (text) {
            const values = parseSMS(text)
            // don't know why I can't  use {} = values
            accessCode = values.accessCode
            latitude = values.latitude
            longitude = values.longitude
            forecastDays = values.forecastDays
            hourlyInterval = values.hourlyInterval
        } else {
            return new Response("No text content", {status: 400})
        }

        // validate access code against env variable
        if (accessCode !== process.env.WEATHER_API_ACCESS_CODE) {
            return new Response("Bad request", {status: 400})
        }

        // request hourly or daily based on forecast_days
        let smsBody
        hourlyInterval ? smsBody = await getHourlyWeather(latitude,longitude,forecastDays,hourlyInterval) : smsBody = await getDailyWeather(latitude,longitude,forecastDays)

        const twilioResponse = 
`<?xml version="1.0" encoding="UTF-8"?>
<Response><Message>
${smsBody}</Message></Response>`

        return new Response(twilioResponse, { headers: {"Content-Type": "application/xml"}, status: 200})
    } catch (err: any) {
        console.error(err)
        return new Response(err.message, { status: 500 })
    }
}

