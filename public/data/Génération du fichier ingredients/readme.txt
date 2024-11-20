Pré-requis :
- avoir python d'installé,
- avoir récupéré le fichier source sur le site Ciqual : https://ciqual.anses.fr/#/cms/telechargement/node/20
  => Table Ciqual, format Excel	(lien direct : https://ciqual.anses.fr/cms/sites/default/files/inline-files/Table%20Ciqual%202020_FR_2020%2007%2007.xls)
- convertir le fichier .xls en .xlsx (l'ouvrir dans excel, enregistrer sous)

Génération du fichier ingredients :
- ouvrir une fenêtre bash ici,
- lancer la commande :
  python convert_ciqual_to_json.py