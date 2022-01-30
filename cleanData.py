import json
import csv

data = []

filters = {
  'type': 'large_airport',
  'country': 'US'
}

with open("airport-codes.csv") as f:
  file = csv.reader(f)
  for line in file: # ident,type,name,elevation_ft,continent,iso_country,iso_region,municipality,gps_code,iata_code,local_code,coordinates
    ident = line[0]
    type = line[1]
    country = line[5]
    # print(ident, type, country)
    if type == filters['type'] and country == filters['country']:
      data.append(ident)

print(data)

with open("codes.json", 'w') as f:
  json.dump(data, f)