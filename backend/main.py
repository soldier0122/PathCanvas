from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import osmnx as ox
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_graph(lat, lng, radius):
    G = ox.graph_from_point((lat, lng), dist=radius, network_type='walk')
    G_proj = ox.project_graph(G)
    return G_proj

@app.get("/test")
def read_root():
    return {"status": "Backend is live and ready for spatial routing"}

@app.get("/generate-graph")
def get_graph(lat: float, lng: float, radius: int = 1000):
    G_proj = generate_graph(lat, lng, radius)
    nodes, edges = ox.graph_to_gdfs(G_proj)
    edges_wgs84 = edges.to_crs('EPSG:4326')
    geojson_str = edges_wgs84.to_json()
    return json.loads(geojson_str)