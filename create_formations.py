# -*- coding: utf-8 -*-
import json, urllib.request, urllib.error
base='http://localhost:8080/api/formations'
headers={'Content-Type':'application/json'}
formations=[
    {'title':'Developpement Web Moderne','description':'Apprenez a creer des applications web reactives avec React, Node.js et les meilleures pratiques modernes.','domain':'dev','level':'BEGINNER','duration':8,'price':25000.0,'image':'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2','rating':4.8,'reviews':34,'participants':120,'mode':'ONLINE','isActive':True,'objectives':['Comprendre le HTML/CSS/JS modernes','Maitriser React et les hooks','Deployer une application web'],'prerequisites':['Notions de programmation','Aimer le web'],'includes':['Projets concrets','Support de cours','Certificat de fin de formation'],'whatYouWillLearn':'Creer et deployer des applications web modernes utilisant React et Node.js.'},
    {'title':'Data Science et Machine Learning','description':'Devenez un expert en science des donnees avec Python, pandas, scikit-learn et des techniques de machine learning.','domain':'data','level':'INTERMEDIATE','duration':10,'price':32000.0,'image':'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e','rating':4.7,'reviews':54,'participants':89,'mode':'HYBRID','isActive':True,'objectives':['Analyser des jeux de donnees','Construire des modeles predictifs','Visualiser les resultats'],'prerequisites':['Notions de Python','Statistiques de base'],'includes':['Datasets reels','Projets en groupe','Acces aux ressources'],'whatYouWillLearn':'Utiliser Python et machine learning pour resoudre des problemes data reels.'},
    {'title':'Design UX/UI pour debutants','description':'Apprenez a concevoir des interfaces utilisateur engageantes et ergonomiques pour applications web et mobiles.','domain':'design','level':'BEGINNER','duration':6,'price':22000.0,'image':'https://images.unsplash.com/photo-1498050108023-c5249f4df085','rating':4.9,'reviews':22,'participants':74,'mode':'ONLINE','isActive':True,'objectives':['Comprendre les principes UX','Maitriser le prototypage','Creer des interfaces attractives'],'prerequisites':['Curiosite pour le design'],'includes':['Templates Figma','Cas pratiques','Feedback personnalise'],'whatYouWillLearn':'Concevoir des experiences utilisateurs efficaces et belles.'}
]
for formation in formations:
    data=json.dumps(formation).encode('utf-8')
    req=urllib.request.Request(base, data=data, headers=headers, method='POST')
    try:
        res=urllib.request.urlopen(req)
        body=json.load(res)
        print('CREATED', body.get('id'), body.get('title'))
    except urllib.error.HTTPError as e:
        print('ERROR', e.code, e.read().decode())
