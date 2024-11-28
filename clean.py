import pandas as pd

file_path = "crash.csv" 
data = pd.read_csv(file_path)

string_columns = data.select_dtypes(include=['object']).columns

for col in string_columns:
    data[col] = data[col].str.lower()

data['Route.Type'] = data['Route.Type'].fillna('unknown')
data['Route.Type'] = data['Route.Type'].replace('maryland (state) route', 'maryland (state)')
data['Route.Type'] = data['Route.Type'].replace('government (state)', 'government')
data['Route.Type'] = data['Route.Type'].replace('government route', 'government')
data['Route.Type'] = data['Route.Type'].replace('county route', 'county')

mapping = {key.lower(): value.lower() for key, value in {
    'DAYLIGHT': 'DAYLIGHT',
    'DARK LIGHTS ON': 'DARK - LIGHTED',
    'DARK - LIGHTED': 'DARK - LIGHTED',
    'DARK NO LIGHTS': 'DARK - NOT LIGHTED',
    'DARK - NOT LIGHTED': 'DARK - NOT LIGHTED',
    'DARK -- UNKNOWN LIGHTING': 'DARK - UNKNOWN LIGHTING',
    'DARK - UNKNOWN LIGHTING': 'DARK - UNKNOWN LIGHTING',
    'DAWN': 'DAWN',
    'DUSK': 'DUSK',
    'OTHER': 'UNKNOWN',
    'UNKNOWN': 'UNKNOWN'
}.items()}
data['Light'] = data['Light'].str.lower().replace(mapping)

data['Traffic.Control'] = data['Traffic.Control'].str.upper().str.strip()
data['Traffic.Control'] = data['Traffic.Control'].fillna('UNKNOWN')

mapping2 = {
    'NO CONTROLS': 'NO CONTROLS',
    'NO CONTROL': 'NO CONTROLS',
    'STOP SIGN': 'STOP SIGN',
    'TRAFFIC SIGNAL': 'TRAFFIC SIGNAL',
    'TRAFFIC CONTROL SIGNAL': 'TRAFFIC SIGNAL',
    'FLASHING TRAFFIC SIGNAL': 'FLASHING TRAFFIC SIGNAL',
    'FLASHING TRAFFIC CONTROL SIGNAL': 'FLASHING TRAFFIC SIGNAL',
    'YIELD SIGN': 'YIELD SIGN',
    'PERSON': 'PERSON',
    'PERSON (INCLUDING FLAGGER, LAW ENFORCEMENT, CROSSING GUARD, ETC.)': 'PERSON',
    'PERSON (INCLUDING FLAGGER, LAW ENFORCEMENT, CROSSING GUARD, ETC.': 'PERSON',
    'PEDESTRIAN CROSSING': 'PEDESTRIAN CROSSING',
    'PEDESTRIAN CROSSING SIGN': 'PEDESTRIAN CROSSING',
    'SCHOOL ZONE SIGN DEVICE': 'SCHOOL ZONE SIGN',
    'SCHOOL ZONE SIGN': 'SCHOOL ZONE SIGN',
    'SCHOOL ZONE': 'SCHOOL ZONE SIGN',
    'WARNING SIGN': 'WARNING SIGN',
    'OTHER WARNING SIGN': 'WARNING SIGN',
    'CURVE AHEAD WARNING SIGN': 'WARNING SIGN',
    'INTERSECTION AHEAD WARNING SIGN': 'WARNING SIGN',
    'REDUCE SPEED AHEAD WARNING SIGN': 'WARNING SIGN',
    'OTHER SIGNAL': 'OTHER SIGNAL',
    'RAMP METER SIGNAL': 'OTHER SIGNAL',
    'LANE USE CONTROL SIGNAL': 'OTHER SIGNAL',
    'RAILWAY CROSSING DEVICE': 'RAILROAD CROSSING DEVICE',
    'FLASHING RAILROAD CROSSING SIGNAL (MAY INCLUDE GATES)': 'RAILROAD CROSSING DEVICE',
    'OTHER PAVEMENT MARKING (EXCLUDING EDGELINES, CENTERLINES, OR LANE LINES)': 'OTHER PAVEMENT MARKING',
    'BICYCLE CROSSING SIGN': 'BICYCLE CROSSING SIGN',
    'OTHER': 'UNKNOWN',
    'UNKNOWN': 'UNKNOWN',
}

data['Traffic.Control'] = data['Traffic.Control'].replace(mapping2)

data['Collision.Type'] = data['Collision.Type'].fillna('unknown')
mapping3 = {
    'same dir rear end': 'Same Direction Collisions',
    'same dir rend left turn': 'Same Direction Collisions',
    'same dir rend right turn': 'Same Direction Collisions',
    'same direction': 'Same Direction Collisions',
    'same direction left turn': 'Same Direction Collisions',
    'same direction right turn': 'Same Direction Collisions',
    'opposite direction sideswipe': 'Opposite Direction Collisions',
    'opposite dir both left turn': 'Opposite Direction Collisions',
    'sideswipe, same direction': 'Sideswipe Collisions',
    'sideswipe, opposite direction': 'Sideswipe Collisions',
    'head on': 'Head-On Collisions',
    'head on left turn': 'Head-On Collisions',
    'angle': 'Head-On Collisions',
    'angle meets left head on': 'Head-On Collisions',
    'angle meets left turn': 'Turning Collisions',
    'angle meets right turn': 'Turning Collisions',
    'single vehicle': 'Single Vehicle Collisions',
    'straight movement angle': 'Single Vehicle Collisions',
    'front to rear': 'Front/Rear Collisions',
    'rear to side': 'Front/Rear Collisions',
    'rear to rear': 'Front/Rear Collisions',
    'front to front': 'Front/Rear Collisions',
    'same dir both left turn': 'Sideswipe Collisions',
    'same direction sideswipe': 'Sideswipe Collisions',
    'unknown': 'Unknown',
    'other': 'Unknown'
}
data['Collision.Type'] = data['Collision.Type'].replace(mapping3)
string_columns = data.select_dtypes(include=['object']).columns

for col in string_columns:
    data[col] = data[col].str.lower()

output_file_path = "crash2.csv" 
data.to_csv(output_file_path, index=False)

print(f"Processed file saved to {output_file_path}")
