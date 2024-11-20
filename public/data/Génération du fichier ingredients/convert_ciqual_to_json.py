import pandas as pd
import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="openpyxl")

# Charger le fichier Excel
file_path = "Table Ciqual 2020_FR_2020 07 07.xlsx"
data = pd.read_excel(file_path, engine="openpyxl")

# Sélectionner les colonnes pertinentes
columns_to_keep = [
    "alim_code", "alim_nom_fr", "Energie, Règlement UE N° 1169/2011 (kcal/100 g)",
    "Protéines, N x facteur de Jones (g/100 g)", "Glucides (g/100 g)", "Lipides (g/100 g)",
    "Fibres alimentaires (g/100 g)", "Calcium (mg/100 g)", "Fer (mg/100 g)",
    "Magnésium (mg/100 g)", "Phosphore (mg/100 g)", "Potassium (mg/100 g)",
    "Sodium (mg/100 g)", "Rétinol (µg/100 g)", "Beta-Carotène (µg/100 g)", "Vitamine C (mg/100 g)",
    "Vitamine B1 ou Thiamine (mg/100 g)", "Vitamine B2 ou Riboflavine (mg/100 g)",
    "Vitamine B3 ou PP ou Niacine (mg/100 g)", "Vitamine B5 ou Acide pantothénique (mg/100 g)",
    "Vitamine B6 (mg/100 g)", "Vitamine B9 ou Folates totaux (µg/100 g)",
    "Vitamine B12 (µg/100 g)", "Vitamine D (µg/100 g)", "Vitamine E (mg/100 g)", "Vitamine K1 (µg/100 g)"
]

# Filtrer les colonnes
filtered_data = data[columns_to_keep]

# Renommer les colonnes pour simplification
filtered_data = filtered_data.rename(columns={
    "alim_code": "id",
    "alim_nom_fr": "nom",
    "Energie, Règlement UE N° 1169/2011 (kcal/100 g)": "calories",
    "Protéines, N x facteur de Jones (g/100 g)": "proteines",
    "Glucides (g/100 g)": "glucides",
    "Lipides (g/100 g)": "lipides",
    "Fibres alimentaires (g/100 g)": "fibres",
    "Calcium (mg/100 g)": "calcium",
    "Fer (mg/100 g)": "fer",
    "Magnésium (mg/100 g)": "magnesium",
    "Phosphore (mg/100 g)": "phosphore",
    "Potassium (mg/100 g)": "potassium",
    "Sodium (mg/100 g)": "sodium",
    "Rétinol (µg/100 g)": "retinol",
    "Beta-Carotène (µg/100 g)": "beta_carotene",
    "Vitamine C (mg/100 g)": "vitamine_C",
    "Vitamine B1 ou Thiamine (mg/100 g)": "vitamine_B1",
    "Vitamine B2 ou Riboflavine (mg/100 g)": "vitamine_B2",
    "Vitamine B3 ou PP ou Niacine (mg/100 g)": "vitamine_B3",
    "Vitamine B5 ou Acide pantothénique (mg/100 g)": "vitamine_B5",
    "Vitamine B6 (mg/100 g)": "vitamine_B6",
    "Vitamine B9 ou Folates totaux (µg/100 g)": "vitamine_B9",
    "Vitamine B12 (µg/100 g)": "vitamine_B12",
    "Vitamine D (µg/100 g)": "vitamine_D",
    "Vitamine E (mg/100 g)": "vitamine_E",
    "Vitamine K1 (µg/100 g)": "vitamine_K1"
})

# Nettoyer les valeurs (remplacer les virgules par des points, convertir en numérique)
for col in filtered_data.columns[2:]:
    filtered_data[col] = (
        filtered_data[col]
        .replace("-", "0")                      # Remplace les valeurs manquantes
        .replace("traces", "0")                 # Remplace "traces" par 0
        .str.replace(",", ".")                  # Convertit les virgules en points pour les décimales
        .str.replace(r"<\s*(\d+\.?\d*)", r"\1") # Remplace "< 0.5" par "0.5"
        .str.replace(r">\s*(\d+\.?\d*)", r"\1") # Remplace "> 100" par "100"
        .str.strip('"')                         # Supprime les guillemets superflus
    )
    # Conversion en numérique
    filtered_data[col] = pd.to_numeric(filtered_data[col], errors='coerce').fillna(0)

# Sauvegarder en JSON avec les bons paramètres
output_file = "ingredients.json"
filtered_data.to_json(output_file, orient="records", indent=4, force_ascii=False)
print(f"Données sauvegardées dans {output_file}")
