from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time

app = FastAPI(title="ORCA API", description="Oceanic Risk & Condition Analyzer")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class MarineData(BaseModel):
    latitude: float
    longitude: float
    sst: float  # Sea Surface Temperature
    chlorophyll: float
    wind_speed: float
    alert_level: str

# Mock data generator
def generate_mock_data():
    regions = [
        {"lat": 15.3, "lon": 73.8, "name": "Goa Coast"},
        {"lat": 8.1, "lon": 77.5, "name": "Kanyakumari"},
        {"lat": 11.9, "lon": 92.9, "name": "Andaman Islands"},
        {"lat": 21.6, "lon": 88.0, "name": "Sunderbans"}
    ]
    
    data = []
    for region in regions:
        sst = round(random.uniform(26.0, 32.0), 2)
        chloro = round(random.uniform(0.1, 5.0), 2)
        wind = round(random.uniform(5.0, 40.0), 2)
        
        # Simple rule-based alert for mock purposes
        alert = "Normal"
        if sst > 30.0 and chloro < 0.5:
            alert = "High Risk: Potential Coral Bleaching"
        elif wind > 30.0:
            alert = "High Risk: Storm Warning"
        elif chloro > 4.0:
            alert = "Warning: Algal Bloom Detected"
            
        data.append({
            "region": region["name"],
            "latitude": region["lat"],
            "longitude": region["lon"],
            "sst": sst,
            "chlorophyll": chloro,
            "wind_speed": wind,
            "alert_level": alert
        })
    return data

@app.get("/api/marine-data")
async def get_marine_data():
    """Returns simulated marine data for different regions."""
    return {"status": "success", "data": generate_mock_data()}

@app.get("/api/agent-insights")
async def get_agent_insights():
    """
    Simulates a multi-agent conversation analyzing the latest data.
    In a full implementation, this would call LangChain/OpenAI.
    """
    time.sleep(1) # Simulate thinking time
    
    insights = [
        {
            "agent": "Data Analyst",
            "message": "I've detected a significant anomaly in the Andaman Islands region. Sea Surface Temperature is elevated above 31°C while Chlorophyll levels have plummeted to 0.2 mg/m³.",
            "type": "observation"
        },
        {
            "agent": "Marine Biologist",
            "message": "Those conditions are highly indicative of an impending coral bleaching event. The lack of chlorophyll suggests a drop in phytoplankton, which will disrupt the local food web.",
            "type": "analysis"
        },
        {
            "agent": "Stakeholder Advisor",
            "message": "Fishermen in the Andaman region should expect lower pelagic catch rates this week. Coastal authorities should prepare for potential coral reef stress monitoring.",
            "type": "recommendation"
        }
    ]
    
    return {"status": "success", "insights": insights}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
