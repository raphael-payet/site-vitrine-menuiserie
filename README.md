# Site vitrine menuiserie — Menuiserie Dubois

Site vitrine premium multi-pages pour un artisan menuisier, fidèle au design
Claude Design « Site vitrine menuisiers premium ».
**HTML / CSS / JavaScript purs** — aucun framework, aucune étape de build.
Ouvrez `index.html` dans un navigateur, c'est tout.

```
.
├── index.html            → Accueil (hero vidéo + effet de recouvrement)
├── services.html         → Services + méthode
├── galerie.html          → Réalisations (lightbox plein écran)
├── blog.html             → Journal de l'atelier
├── contact.html          → Formulaire, coordonnées, Google Maps
├── mentions-legales.html          → Mentions légales ({{PLACEHOLDERS}})
├── politique-confidentialite.html → Politique de confidentialité ({{PLACEHOLDERS}})
├── assets/
│   ├── css/style.css     → styles (couleurs & polices dans :root, tout en haut)
│   ├── js/main.js        → interactions (config en haut du fichier)
│   ├── fonts/            → polices hébergées + leurs licences
│   └── img/              → images (placeholders SVG à remplacer)
└── README.md
```

---

## Personnaliser le site en quelques minutes

### 1. Les couleurs (2 min)
Tout est centralisé dans `assets/css/style.css`, bloc `:root` en tête de
fichier (section « 1. CONFIGURATION »). Deux palettes :

```css
--accent:  #D3A873;   /* doré — couleur principale        */
--bg:      #100D0A;   /* fond sombre                       */
--band-bg: #D2BB90;   /* bande beige marbrée               */
```
Chaque variable est commentée ; changez-les, tout le site suit.

### 2. Les polices (1 min)
- Titres : `--font-serif` (Cormorant Garamond) — texte : `--font-sans` (Jost).
- Les polices sont **hébergées sur le site** (`assets/fonts/`) : aucun appel
  à Google Fonts, donc aucune adresse IP de visiteur transmise (RGPD).
- Pour changer de police : télécharger le fichier `.woff2` « variable »
  (jeu latin) et sa licence dans `assets/fonts/`, mettre à jour les deux
  blocs `@font-face` juste après `:root` dans `style.css`, puis les deux
  lignes `<link rel="preload">` dans le `<head>` de **chaque page**.

### 3. Nom, textes, coordonnées (5 min)
Tout est dans les fichiers HTML, en clair. Recherchez / remplacez sur les
5 pages :
- **Nom** : `Menuiserie Dubois` — si le nom dépasse ~25 caractères, mettre une
  version courte dans l'en-tête (`<span class="brand__name">`) : sur les
  petits téléphones, il passe sinon sur 3 lignes.
- **Téléphone** : `04 78 12 34 56` et les liens `tel:+33478123456`
- **Email** : `contact@menuiserie-dubois.fr`
- **Adresse** : `12 rue des Charpentiers`, `69003 Lyon`
- **Horaires** : blocs « Horaires » (pied de page + page contact)
- Le bloc **SEO** de chaque page (`<title>`, `<meta name="description">`,
  `<link rel="canonical">`) et les **données structurées** JSON-LD dans
  `index.html`.
- **Logo** : remplacez le losange `<span class="brand__diamond">` par
  `<img src="assets/img/logo.svg" alt="" height="40">` (commentaire dans
  le code).

### 4. Les images (3 min)
Le dossier `assets/img/` contient des **illustrations vectorielles** (SVG)
cohérentes avec le thème (cuisine, escalier, bibliothèque, dressing, fenêtres,
terrasse, atelier). Elles servent de visuels par défaut, prêts à être
remplacés par vos **photos réelles** en **gardant les mêmes noms** :
`work-1.svg` (cuisine) … `work-6.svg` (terrasse), `about.svg` (atelier),
`hero.svg` (affiche de la vidéo).

> Pour une photo, remplacez le fichier `.svg` par un `.jpg`/`.webp` et mettez
> à jour l'attribut `src` de la balise `<img>` (ou `poster` de la vidéo)
> correspondante.

- Vous pouvez aussi mettre des `.jpg`/`.webp` : changez alors les attributs
  `src` des balises `<img>` correspondantes.
- Les légendes plein écran de la galerie se règlent via `data-caption`.
- **Avant / après** (bas de la galerie) : remplacer `avant-1.svg` et
  `apres-1.svg` par deux photos **prises du même endroit, avec le même
  cadrage** (sinon la comparaison ne fonctionne pas), et adapter les textes
  `alt` et la légende. Pour ajouter une comparaison, dupliquer le bloc
  `<figure class="ba">`. Pas de photos avant/après → supprimer tout le bloc
  `<div class="before-after">`.

### 5. La vidéo du hero (1 min)
Dans `index.html`, bloc `<video>` du hero : remplacez le `src` de la balise
`<source>` (idéalement un `.mp4` local, ex. `assets/video/hero.mp4`, sombre,
muet, en boucle). L'image `poster` s'affiche pendant le chargement.
La vidéo n'apparaît que dans le hero et se met en pause automatiquement dès
qu'il est recouvert.

### 6. Les avis Google (2 min)
Dans `index.html`, section « Ils nous font confiance » : le **carrousel
Coverflow** est constitué des blocs `<figure class="cf-review">` (5 avis).
Dupliquez / éditez le texte, le nom et la date de chaque avis, et **gardez
autant de puces `.cf-dot` que d'avis**. L'avis du milieu est mis en avant au
chargement. Mettez aussi à jour la note globale (« 4,9/5 — 47 avis ») et le
lien « Voir tous les avis sur Google » avec l'URL de votre fiche Google
Business.

### 7. Les services (2 min)
- Accueil : cartes `<a class="dark-card">` (3 aperçus).
- Page services : blocs `<article class="service-card">` — dupliquez-en
  un pour ajouter un service.

### 8. Google Maps (30 s)
Dans `contact.html`, section « CARTE » (conteneur premium `.map-card`) :
changez l'adresse à **deux** endroits — le paramètre `q=` du lien
« Afficher la carte » **et** le `destination=` du bouton « Itinéraire ».
Pour respecter le RGPD, la carte Google ne se charge qu'au clic du visiteur
(avant, un aperçu sans aucun appel à Google s'affiche).

### 9. Le formulaire de devis (5 min)
Les demandes sont envoyées par [Web3Forms](https://web3forms.com) (gratuit,
250 envois/mois) directement dans la boîte mail du client. Tout se règle
dans `contact.html`, en haut du formulaire.

**a) La clé Web3Forms** — c'est nous qui la créons :
1. Sur [web3forms.com](https://web3forms.com), saisir l'**adresse mail du
   client** (celle qui doit recevoir les devis).
2. Web3Forms envoie la clé à cette adresse : demander au client de nous
   transférer ce mail.
3. Dans `contact.html`, remplacer `{{WEB3FORMS_ACCESS_KEY}}` par la clé.

> La clé n'est pas un mot de passe : elle indique seulement à quelle adresse
> envoyer les demandes. Elle peut rester visible dans le code.
>
> **Tant que la clé n'est pas renseignée, le formulaire affiche un message
> d'erreur** (jamais un faux « Merci ! »). C'est voulu : un oubli se voit
> immédiatement.

**b) WhatsApp pour les photos** — dans le message de confirmation, remplacer
`{{WHATSAPP_NUMERO}}` par le portable du client au format international,
**sans le 0 ni le +** : `06 12 34 56 78` → `33612345678`.
- Client **sans WhatsApp** : supprimer « ou par WhatsApp » (un commentaire
  indique quoi effacer).
- Client qui préfère les **SMS** : remplacer `https://wa.me/33612345678` par
  `sms:+33612345678` et le texte « par WhatsApp » par « par SMS ».
- Client sur **Messenger** : remplacer le lien par
  `https://m.me/NomDeLaPageFacebook` et le texte par « par Messenger ».

**c) Tester avant la livraison** : envoyer une vraie demande depuis le site
en ligne et vérifier que le client la reçoit. En cliquant « Répondre » dans
sa messagerie, il répond directement au prospect.

**d) Le formulaire en 2 étapes** : le prospect remplit d'abord ses
coordonnées et son projet, clique « Continuer », puis peut préciser (sans
obligation) le type de projet, la commune, le budget, le délai et comment il
a connu l'entreprise. Tout part en un seul envoi. Les **listes de choix** se
modifient dans `contact.html` (une ligne `<option>` par choix) : aligner les
types de projet sur les services du client. Quand le prospect choisit
« Autre », un champ « Si autre, précisez » apparaît (garder le mot exact
`Autre` pour que ça fonctionne). Garder des choix **courts
(25 caractères maximum)**, sinon ils apparaissent coupés sur ordinateur.

**Options** :
- L'email du prospect est **obligatoire** par défaut. Pour le rendre
  facultatif : retirer le mot `required` sur le champ email (un commentaire
  l'indique) et l'astérisque de son libellé.
- Les photos ne peuvent pas être jointes au formulaire (option payante chez
  Web3Forms) : d'où l'invitation à les envoyer par mail ou WhatsApp.

### 10. Les pages légales (2 min)
`mentions-legales.html` et `politique-confidentialite.html` sont rédigées avec
des **placeholders** de la forme `{{NOM_ENTREPRISE}}`. Chaque page commence par
un **commentaire HTML récapitulant toutes les variables à remplacer** — un
simple rechercher/remplacer suffit :

| Placeholder | Exemple |
|---|---|
| `{{NOM_ENTREPRISE}}` · `{{FORME_JURIDIQUE}}` | Menuiserie Dubois · SARL |
| `{{ADRESSE}}` · `{{CODE_POSTAL}}` · `{{VILLE}}` | 12 rue des Charpentiers · 69003 · Lyon |
| `{{SIRET}}` · `{{DIRECTEUR_PUBLICATION}}` | 123 456 789 00012 · Jean Dubois |
| `{{IMMATRICULATION}}` | RCS Lyon 123 456 789 · ou RNE n° 123 456 789 |
| `{{CAPITAL_SOCIAL}}` · `{{TVA_INTRACOM}}` | 10 000 € (ligne à supprimer si entreprise individuelle) · FR 12 123456789 (ou « TVA non applicable, art. 293 B du CGI ») |
| `{{ASSUREUR_NOM}}` · `{{ASSUREUR_ADRESSE}}` · `{{ASSURANCE_COUVERTURE}}` | Assureur de la garantie décennale · son adresse · France métropolitaine |
| `{{MEDIATEUR_NOM}}` · `{{MEDIATEUR_ADRESSE}}` · `{{MEDIATEUR_SITE}}` | Médiateur de la consommation auquel le client a adhéré (obligatoire s'il vend à des particuliers) |
| `{{TELEPHONE}}` · `{{EMAIL}}` | 04 78 12 34 56 · contact@… |
| `{{HEBERGEUR_NOM}}` · `{{HEBERGEUR_ADRESSE}}` · `{{HEBERGEUR_TELEPHONE}}` | OVH · Roubaix · … |
| `{{DUREE_CONSERVATION}}` | 3 ans |

> ⚠️ Ces textes sont un **modèle indicatif** : à faire relire par un
> professionnel du droit, au moins pour les premiers clients.
>
> Ces pages sont en `noindex` (elles n'ont pas vocation à être référencées) et
> sont liées depuis le pied de page de toutes les pages du site.

---

## Effets & interactions (déjà en place)

- **Hero vidéo « rideau »** : la section suivante recouvre progressivement
  le hero au défilement ; parallaxe discret sur la vidéo et le texte ;
  la vidéo se coupe une fois recouverte et ne réapparaît plus.
- **Navigation premium** : transparente en haut de page, fond sombre flouté
  après quelques pixels de défilement ; menu mobile plein écran.
- **Profondeur** : bande beige marbrée fondue dans le noir par dégradés
  (aucune coupure brutale), ombre portée du contenu sur le hero.
- **Animations** : fade-in + translation au scroll (IntersectionObserver),
  cascade sur les grilles, micro-interactions sur les boutons — uniquement
  `transform` / `opacity`.
- **Carrousel Coverflow d'avis Google** : avis central mis en avant, avis
  latéraux plus petits/atténués pour la profondeur (translate + scale +
  opacity + léger pivot). Clic sur une carte latérale, flèches, puces,
  glissement tactile et clavier ; défilement auto en pause au survol/focus.
- **Carte Maps premium (contact)** : conteneur arrondi, ombre douce, teinte
  sombre assortie, bouton « Itinéraire » vers Google Maps.
- **Galerie** : ouverture des photos en plein écran (lightbox), clavier
  et touche Échap gérés.
- **Mobile** : barre fixe « Appeler / Devis gratuit » en bas de l'écran,
  visible dès l'arrivée ; téléphone aussi accessible dans l'en-tête.

## Détails techniques

- **Performances** : aucune dépendance externe (polices hébergées et
  préchargées),
  images `loading="lazy"`, JS `defer`, une seule boucle de scroll (rAF).
- **SEO** : HTML sémantique, métadonnées par page, Open Graph, JSON-LD
  `Carpenter` (schema.org), `alt` sur toutes les images.
- **Responsive** : mobile d'abord — grilles fluides (`auto-fit`), `clamp()`,
  menu mobile sous 960 px, hero en `100svh`.
- **Accessibilité** : lien d'évitement, navigation clavier, `aria-*`,
  focus visibles, respect de `prefers-reduced-motion` (parallaxe et
  animations désactivés).

## Mise en ligne
Hébergez le dossier tel quel sur n'importe quel hébergement statique :
Netlify, Vercel, GitHub Pages, Cloudflare Pages, ou un simple serveur FTP.
