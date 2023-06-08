# Dotnet Core API

### create the dotnet web api

```
dotnet new webapi -n Backend
cd Backend
```

### enable https

```
dotnet dev-certs https --trust
```

### inside the launchSettings.json delete the http profile and configure the https profile like the following

```
"https": {
    "commandName": "Project",
    "dotnetRunMessages": true,
    "launchBrowser": true,
    "launchUrl": "swagger",
    "applicationUrl": "https://localhost:5001",
    "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
    }
},
```

### enable cors inside the Program.cs

```
var builder = WebApplication.CreateBuilder(args);
// ...
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("https://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

// ...

app.UseCors("AllowSpecificOrigin");

// ...

app.Run();
```

### run the backend

```
dotnet run
```

### this should give you the default dotnet core api endpoint

```
https://localhost:5001/weatherforecast
```

# Vite App

### setup the frontend

```
pnpm create vite frontend --template react-swc-ts
cd frontend && pnpm i
```

### install vite https dev server

```
pnpm add -D vite-plugin-mkcert
```

### configure vite.config.ts

```
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import mkcert from "vite-plugin-mkcert"


export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
    port: 3000,
  },
})
```

### change the App.tsx to the following:

```
import { useEffect } from "react"

function App() {
  const load = async () => {
    const response = await fetch("https://localhost:5001/weatherforecast").then(
      data => data.json()
    )

    console.log(response)
  }

  useEffect(() => {
    load()
  }, [])

  return null
}

export default App
```

### run the frontend

```
pnpm dev
```

### this should give you an empty page with the forecast logged to the console

```
https://localhost:3000/
```
