from datetime import datetime
import json



sampleJson = """{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}"""

my_json = json.loads(sampleJson)
data_now = datetime.now().strftime("%Y-%m-%d")
my_json["company"]["employee"]["birth_date"] = data_now

json_file = "file.json"

with open(json_file, "w", encoding="utf-8") as file_obj: 
    json.dump(my_json, file_obj, indent=4, sort_keys=True)

print(data_now)
print(my_json)
print(my_json["company"]["employee"])

