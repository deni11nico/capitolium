/**
 * All site copy lives here, Romanian first. Every key exists in both languages
 * so the toggle never falls back to the other language mid page.
 */

export const LANGUAGES = ['ro', 'en']
export const DEFAULT_LANGUAGE = 'ro'

export const content = {
  ro: {
    meta: {
      title: 'Maniu 65 Central | Proprietate de investiție în centrul Oradiei',
      description:
        'Oportunitate unică de investiție: imobil complet modernizat, 6 unități independente, vândut integral, într-o singură tranzacție. Ideal pentru investiție, oportunitate de business.',
    },

    nav: {
      home: 'Acasă',
      property: 'Proprietate',
      exterior: 'Exterior',
      units: 'Apartamente',
      investment: 'Investiție',
      contact: 'Contact',
      requestCta: 'Solicită informații',
      menu: 'Meniu',
      close: 'Închide',
    },

    /** Headers for the pages that do not simply reuse a section's own heading. */
    pages: {
      property: {
        eyebrow: 'Proprietate',
        title: 'Execuție, tehnologie și confort',
        lead: 'Tot ce ține de construcție, instalații și eficiență, adunat într-un singur loc.',
      },
      exterior: {
        eyebrow: 'Exterior',
        title: 'Curtea și facilitățile',
        lead: 'Spațiul exterior al imobilului, în detaliu.',
      },
    },

    common: {
      viewAllUnits: 'Vezi toate apartamentele',
      home: 'Acasă',
      courtyardGallery: 'Galerie curte',
    },

    hero: {
      eyebrow: 'Str. Iuliu Maniu · Ultracentral, Oradea',
      title: 'Proprietate exclusivistă',
      titleAccent: 'în inima Oradiei',
      lead: 'Oportunitate unică de investiție: imobil complet modernizat, 6 unități independente, vândut integral, într-o singură tranzacție. Ideal pentru investiție, oportunitate de business.',
      cta: 'Vezi proprietatea',
      scroll: 'Derulează',
      confidential:
        'Informațiile sunt confidențiale și folosite exclusiv pentru procesul de vânzare.',
    },

    /** The reassurance strip that sits between the hero and the page. */
    trust: [
      { icon: 'units', value: '6', label: 'unități independente' },
      { icon: 'whole', label: 'Vânzare integrală' },
      { icon: 'place', label: 'Ultracentral Oradea' },
      { icon: 'owner', label: 'Direct de la proprietar' },
    ],

    opportunities: {
      titleLineOne: 'O proprietate.',
      titleLineTwo: 'Multiple oportunități.',
      body: 'Ideală pentru proiecte de anvergură care aduc valoare într-o locație premium, cu potențial ridicat de randament.',
      items: ['Boutique hotel', 'Aparthotel', 'Clinică', 'Sediu premium'],
      disclaimer:
        'Imaginile sunt generate cu AI pentru a ilustra posibilitățile de utilizare ale proprietății. Imaginile reale, actuale le găsiți în galeria foto.',
    },

    faq: {
      eyebrow: 'Întrebări frecvente',
      title: 'Ce trebuie să știți',
      items: [
        {
          q: 'Se vinde și pe apartamente separate?',
          a: 'Nu. Imobilul se vinde exclusiv integral, ca un singur activ.',
        },
        {
          q: 'Colaborați cu agenții imobiliare?',
          a: 'Nu, tranzacția se face direct cu proprietarul.',
        },
        {
          q: 'Care este prețul?',
          a: 'Preț disponibil la cerere, în urma completării formularului.',
        },
      ],
    },

    form: {
      eyebrow: 'Solicitare',
      sectionTitle: 'Interesat de această proprietate?',
      title: 'Solicită informații despre achiziție',
      lead: 'Câteva întrebări scurte, ca să știm dacă oportunitatea vi se potrivește.',
      yes: 'Da',
      fields: {
        name: 'Nume',
        phone: 'Telefon',
        email: 'Email',
        subject: 'Subiect',
      },
      no: 'Nu',
      acquisition: 'Sunteți interesat de achiziția integrală a imobilului?',
      agency: 'Reprezentați o agenție imobiliară?',
      buyerType: 'Tip cumpărător',
      // Stable ids so a language switch never drops the current selection.
      buyerOptions: [
        { id: 'individual', label: 'Persoană fizică' },
        { id: 'investor', label: 'Investitor' },
        { id: 'fund', label: 'Fond de investiții' },
      ],
      budget: 'Interval buget estimat (opțional)',
      budgetPlaceholder: 'Selectați intervalul',
      budgetOptions: [
        { id: 'under-500', label: 'sub 500.000 €' },
        { id: '500-750', label: '500.000 – 750.000 €' },
        { id: '750-1000', label: '750.000 – 1.000.000 €' },
        { id: 'over-1000', label: 'peste 1.000.000 €' },
      ],
      submit: 'Trimite solicitarea',
      reassurance: 'Vă vom contacta doar în legătură cu această oportunitate.',
      requiredField: 'Vă rugăm să completați acest câmp.',
      requiredNotice: 'Vă rugăm să răspundeți la această întrebare.',
      invalidEmail: 'Vă rugăm să introduceți o adresă de email validă.',
      invalidPhone: 'Introduceți un număr de telefon valid.',
      requiredMark: '(obligatoriu)',
      sending: 'Se trimite...',
      sendFailed:
        'Solicitarea nu a putut fi trimisă. Vă rugăm să ne scrieți la maniucentralproperty@gmail.com.',
      successTitle: 'Solicitare trimisă',
      successBody:
        'Vă mulțumim. Vă vom contacta în cel mai scurt timp în legătură cu această oportunitate.',
    },

    intro: {
      eyebrow: 'Prezentare',
      title: 'Un imobil cu adevărat remarcabil',
      paragraphs: [
        'Într-una dintre cele mai prestigioase și căutate zone ale Oradiei, vă prezentăm un imobil cu adevărat remarcabil, conceput pentru a satisface cele mai exigente standarde investiționale și operaționale.',
        'Această proprietate reprezintă o combinație rară între poziționare strategică, execuție impecabilă și tehnologie de ultimă generație, fiind pregătită pentru exploatare imediată în segmente premium: hotel boutique, apartamente în regim hotelier sau spații profesionale de elită.',
      ],
      uses: [
        { label: 'Hotel boutique', icon: 'hotel' },
        { label: 'Apartamente în regim hotelier', icon: 'apartment' },
        { label: 'Spații profesionale de elită', icon: 'office' },
      ],
    },

    architecture: {
      eyebrow: 'Arhitectură & Configurație',
      title: 'Configurat inteligent, în jurul unei curți interioare',
      body: 'Imobilul este amplasat pe un teren generos de 795 mp, cu o amprentă construită de 363,1 mp, configurat inteligent într-un ansamblu de 6 apartamente independente, fiecare cu identitate proprie. Dispunerea în jurul unei curți interioare oferă intimitate, funcționalitate și o experiență rafinată a locuirii, rar întâlnită în zona centrală.',
      stats: [
        { value: '795', unit: 'mp', label: 'Teren', note: 'Suprafață generoasă în zonă ultracentrală.' },
        { value: '363,1', unit: 'mp', label: 'Amprentă construită', note: 'Construcție compactă, eficient dispusă.' },
        { value: '6', unit: '', label: 'Apartamente', note: 'Unități independente, fiecare cu identitate proprie.' },
        { value: '6', unit: '', label: 'Locuri de parcare', note: 'Private, în incinta proprietății.' },
      ],
    },

    execution: {
      eyebrow: 'Execuție premium',
      title: 'Materiale de top, alese pentru durabilitate',
      body: 'Fiecare detaliu de execuție a fost selectat pentru a rezista exploatării intensive fără compromisuri estetice.',
      items: [
        {
          icon: 'window',
          title: 'Tâmplărie germană Veka 70',
          text: 'Profile Veka 70 cu feronerie Winkhaus, pentru izolare fonică și termică de nivel superior.',
        },
        {
          icon: 'insulation',
          title: 'Izolație termică performantă',
          text: 'Vată minerală bazaltică Petralana Petrafas 34 la pereții exteriori și lână de lemn STEICO la tavane.',
        },
        {
          icon: 'finishes',
          title: 'Finisaje atent selecționate',
          text: 'Alese pentru durabilitate și o estetică contemporană, coerentă în toate unitățile.',
        },
      ],
      brands: ['Veka', 'Winkhaus', 'Petralana', 'STEICO NaturePlus'],
    },

    technical: {
      eyebrow: 'Detalii tehnice',
      title: 'Specificațiile din spatele finisajelor',
      body: 'Echipamentele, materialele și soluțiile constructive folosite la renovarea imobilului.',
      gate: {
        icon: 'gate',
        title: 'Acces & automatizări',
        text: 'Poartă de acces auto și pietonal din lemn stratificat, acționată electric, cu echipament FAAC, lider internațional în automatizări de acces și mobilitate.',
      },
      heating: {
        icon: 'boiler',
        title: 'Sistem termic',
        text: 'Centrală termică cu condensare Daikin, 24 kW.',
      },
      courtyard: {
        icon: 'paving',
        title: 'Curte',
        text: 'Curte de 300 mp, pavată cu dale Starstone, lipite cu adeziv pe șapă de beton, cu impermeabilizare. Rezistență la trafic auto de până la 3,5 tone, ideală pentru zona de parcare și curtea interioară.',
      },
      walls: {
        icon: 'insulation',
        title: 'Izolație pereți exteriori',
        text: 'Vată minerală bazaltică Petralana Petrafas 34, izolație termică performantă, clasă de reacție la foc A1.',
        extra:
          'Plăci rigide din bazalt topit, cu o conductivitate termică declarată de 0,034 W/mK. Materialul este incombustibil, permeabil la vapori și stabil dimensional, conform standardului EN 13162.',
        linkLabel: 'Vezi detalii produs',
      },
      ceilings: {
        icon: 'woodwool',
        title: 'Izolație tavane',
        text: 'Lână de lemn STEICO, produs 100% natural, certificat NaturePlus Eco-Label, soluție ecologică furnizată de Izolații Naturale.',
        sourceLabel: 'Sursă',
      },
      galleryTitle: 'Din timpul lucrărilor',
    },

    technology: {
      eyebrow: 'Tehnologie & Smart Living',
      title: 'Pregătit pentru operare automatizată',
      body: 'Infrastructura tehnică permite administrarea integrală a imobilului de la distanță, fără personal permanent la fața locului.',
      items: [
        {
          icon: 'smart',
          title: 'Gewiss Chorus EGO Smart Home',
          text: 'Sistem inteligent integrat pentru lumini, climatizare și scenarii de utilizare.',
        },
        {
          icon: 'network',
          title: 'Infrastructură IT MikroTik',
          text: 'Rețea profesională, dimensionată pentru utilizare intensivă și rețele separate per unitate.',
        },
        {
          icon: 'access',
          title: 'Acces securizat și automatizat',
          text: 'Ideal pentru self check-in, fără prezență fizică la predarea cheilor.',
        },
        {
          icon: 'security',
          title: 'Securitate integrată Hikvision',
          text: 'Sistem complet de supraveghere video, alarmă antiefracție și detecție incendiu.',
        },
      ],
    },

    comfort: {
      eyebrow: 'Confort absolut',
      title: 'Confort constant, în fiecare unitate',
      body: 'Fiecare apartament are propriile echipamente de climatizare și încălzire, controlate independent.',
      items: [
        { icon: 'heating', title: 'Încălzire în pardoseală', text: 'Completată de centrale termice individuale pentru fiecare unitate.' },
        { icon: 'ac', title: 'Climatizare Daikin', text: 'Aer condiționat premium, instalat în fiecare apartament.' },
        { icon: 'ventilation', title: 'Ventilație Soler & Palau', text: 'Sisteme Silent Dual, cu funcționare inteligentă și silențioasă.' },
        { icon: 'shutters', title: 'Jaluzele exterioare', text: 'Din aluminiu, acționate electric, pentru intimitate și control termic.' },
      ],
    },

    energy: {
      eyebrow: 'Eficiență & sustenabilitate',
      badge: 'Clasă energetică',
      badgeValue: 'B',
      title: 'Costuri de operare optimizate',
      items: [
        'Clasă energetică B, certificată',
        'Materiale naturale, respirație optimă a clădirii',
        'Costuri operaționale optimizate pentru exploatare intensivă',
      ],
    },

    exterior: {
      eyebrow: 'Exterior & facilități',
      title: 'Curte amenajată, parcare privată',
      body: 'Spațiul exterior este parte din experiența proprietății, nu o anexă a ei.',
      items: [
        { icon: 'parking', title: '6 locuri de parcare', text: 'Private, în incinta imobilului, un privilegiu real în ultracentru.' },
        { icon: 'garden', title: 'Curte amenajată', text: 'Spațiu verde întreținut, cu zone de relaxare în aer liber.' },
        { icon: 'expand', title: 'Potențial de extindere', text: 'Posibilitate de extindere sau reconfigurare a spațiilor existente.' },
      ],
    },

    units: {
      eyebrow: 'Apartamente',
      title: 'Șase unități independente, fiecare cu identitate proprie',
      body: 'Explorați fiecare unitate în detaliu, prin galeria completă de fotografii.',
      photosLabel: 'fotografii',
      view: 'Vezi galeria',
      cellarNote: 'Spațiu tehnic și de depozitare',
    },

    unit: {
      back: 'Înapoi la apartamente',
      backHome: 'Înapoi la prezentare',
      gallery: 'Galerie foto',
      galleryNote: 'Apăsați pe orice fotografie pentru a o vedea la dimensiune completă.',
      photos: 'fotografii',
      prev: 'Fotografia anterioară',
      next: 'Fotografia următoare',
      closeLightbox: 'Închide galeria',
      of: 'din',
      enquire: 'Solicită detalii',
      nextUnit: 'Următorul',
      otherUnits: 'Celelalte unități',
      notFound: 'Unitatea nu a fost găsită',
      notFoundBody: 'Unitatea căutată nu există. Reveniți la pagina de prezentare.',

      plan: 'Plan de nivel',
      planNote: 'Releveu cadastral, decembrie 2025. Apăsați pentru mărire.',
      planZoom: 'Mărește planul',
      roomsLabel: 'Camere',
      areaLabel: 'Suprafață utilă',
      landLabel: 'Cotă teren',
      scheduleTitle: 'Componență',
      scheduleRoom: 'Încăpere',
      scheduleArea: 'Suprafață',
      totalLabel: 'Total suprafață utilă',
      sqm: 'mp',
    },

    investment: {
      eyebrow: 'Valoare investițională',
      title: 'Un activ rar, complet modernizat',
      items: [
        { title: 'Activ ultracentral', text: 'Un imobil rar, ultracentral, complet modernizat și pregătit de exploatare.' },
        { title: 'Flexibilitate totală', text: 'Flexibilitate operațională completă, adaptabilă oricărui model de business.' },
        { title: 'Monetizare premium', text: 'Randament ridicat în regim short-term sau venit stabil în regim long-term.' },
        { title: 'Exit fracționat', text: 'Opțiune de vânzare individuală a unităților, pentru lichiditate graduală.' },
      ],
      conclusionTitle: 'Concluzie',
      conclusion:
        'Un imobil care nu doar răspunde cerințelor pieței actuale, ci le anticipează. O investiție sigură, elegantă și scalabilă, într-o locație care garantează valoare pe termen lung.',
    },

    contact: {
      eyebrow: 'Contact',
      title: 'Programați o vizionare',
      body: 'Pentru dosarul complet de prezentare, planuri detaliate și condiții comerciale, luați legătura cu noi.',
      cta: 'Solicită detalii',
      addressLabel: 'Adresă',
      // Confirmed against the cadastral surveys, which all read
      // "Oradea, str. Iuliu Maniu, nr. 65, jud. Bihor".
      address: 'Str. Iuliu Maniu nr. 65, Oradea, județul Bihor, România',
      emailLabel: 'Email',
      email: 'maniucentralproperty@gmail.com',
      placeholder: 'urmează',
      reach: 'Contactează-ne',

      pageTitle: 'Contactează-ne',
      pageLead:
        'Ne poți contacta prin formularul de contact sau folosind datele noastre de contact.',
      detailsTitle: 'Date de contact',
      formTitle: 'Solicitare',
      mapTitle: 'Locația proprietății',
      openInMaps: 'Deschide în Google Maps',
    },

    privacy: {
      eyebrow: 'Legal',
      title: 'Politica de confidențialitate',
      updated: 'Ultima actualizare: 27 august 2026',
      sections: [
        {
          title: 'Operatorul de date',
          intro: 'Operator de date cu caracter personal:',
          lines: [
            'Gere Ferencz-Tivadar, prin CAPITOLIUM TOURS SRL',
            'Sediu social: Str. Avram Iancu, Nr. 8, Municipiul Oradea, Județul Bihor, România',
            'Cod Unic de Înregistrare: 6576836',
          ],
          email: 'gereferencz@yahoo.com',
          emailLabel: 'Email:',
        },
        {
          title: 'Ce date colectăm',
          intro:
            'Prin intermediul formularului de contact de pe acest site, colectăm:',
          list: [
            'Numele dumneavoastră',
            'Adresa de email',
            'Numărul de telefon',
            'Subiectul (opțional) și mesajul transmis',
            'Răspunsurile la întrebările de calificare (interes de achiziție, tip cumpărător, interval de buget estimat)',
          ],
          outro:
            'De asemenea, prin utilizarea site-ului, colectăm automat date tehnice de navigare (ex. pagini vizitate, durata vizitei) prin Google Tag Manager și Google Analytics, cu acordul dumneavoastră exprimat prin bannerul de cookies.',
        },
        {
          title: 'Scopul prelucrării',
          intro: 'Datele colectate sunt folosite exclusiv pentru:',
          list: [
            'A răspunde solicitărilor dumneavoastră legate de proprietatea prezentată pe site',
            'A vă contacta în legătură cu oportunitatea de investiție solicitată',
            'Analiza traficului site-ului, pentru îmbunătățirea experienței utilizatorilor (doar cu acordul dumneavoastră pentru cookies)',
          ],
        },
        {
          title: 'Temeiul legal',
          intro:
            'Prelucrarea se bazează pe consimțământul dumneavoastră, exprimat prin completarea voluntară a formularului de contact și/sau prin acceptarea cookie-urilor.',
        },
        {
          title: 'Destinatarii datelor',
          intro:
            'Datele transmise prin formular sunt procesate prin serviciul terț Web3Forms, exclusiv în scopul transmiterii mesajului către operator. Datele de navigare sunt procesate prin Google (Tag Manager, Analytics), conform politicilor de confidențialitate ale acestor servicii.',
        },
        {
          title: 'Perioada de stocare',
          intro:
            'Datele transmise prin formular sunt păstrate atât timp cât este necesar pentru gestionarea solicitării dumneavoastră, dar nu mai mult de 2 ani de la ultima interacțiune, cu excepția cazului în care legea impune o perioadă diferită.',
        },
        {
          title: 'Drepturile dumneavoastră',
          intro:
            'Conform Regulamentului (UE) 2016/679 (GDPR), aveți dreptul de a:',
          list: [
            'Solicita accesul la datele dumneavoastră personale',
            'Solicita rectificarea sau ștergerea datelor',
            'Vă retrage consimțământul în orice moment',
            'Vă opune prelucrării datelor',
            'Depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)',
          ],
          outro: 'Pentru exercitarea acestor drepturi, ne puteți contacta la:',
          email: 'gereferencz@yahoo.com',
        },
        {
          title: 'Cookie-uri',
          intro:
            'Acest site folosește cookie-uri pentru analiza traficului. Puteți gestiona preferințele de cookie-uri prin bannerul afișat la prima vizită sau prin setările browserului dumneavoastră.',
        },
      ],
    },

    footer: {
      tagline: 'Proprietate exclusivistă în ultracentrul Oradiei.',
      rights: 'Toate drepturile rezervate.',
      privacy: 'Politica de confidențialitate',
      disclaimer:
        'Fotografiile și informațiile au caracter de prezentare și nu constituie ofertă contractuală.',
    },

    a11y: {
      switchTo: 'Comută pe engleză',
      home: 'Maniu 65 Central, pagina principală',
      openGallery: 'Deschide fotografia',
    },
  },

  en: {
    meta: {
      title: 'Maniu 65 Central | Investment property in the heart of Oradea',
      description:
        'Maniu 65 Central, Iuliu Maniu Street, Oradea. A fully modernized ultra-central property, 6 independent units, sold as a single transaction.',
    },

    nav: {
      home: 'Home',
      property: 'Property',
      exterior: 'Exterior',
      units: 'Apartments',
      investment: 'Investment',
      contact: 'Contact',
      requestCta: 'Request information',
      menu: 'Menu',
      close: 'Close',
    },

    /** Headers for the pages that do not simply reuse a section's own heading. */
    pages: {
      property: {
        eyebrow: 'Property',
        title: 'Execution, technology and comfort',
        lead: 'Everything about the build, the systems and the efficiency, gathered in one place.',
      },
      exterior: {
        eyebrow: 'Exterior',
        title: 'The courtyard and amenities',
        lead: "The property's outdoor space, in detail.",
      },
    },

    common: {
      viewAllUnits: 'View all apartments',
      home: 'Home',
      courtyardGallery: 'Courtyard gallery',
    },

    hero: {
      eyebrow: 'Iuliu Maniu Street · Ultra-central, Oradea',
      title: 'An exclusive property',
      titleAccent: 'in the heart of Oradea',
      lead: 'Unique investment opportunity: fully modernized property, 6 independent units, sold as a single transaction. Ideal for investment, a strong business opportunity.',
      cta: 'View the property',
      scroll: 'Scroll',
      confidential:
        'Your information is confidential and used solely for the sale process.',
    },

    /** The reassurance strip that sits between the hero and the page. */
    trust: [
      { icon: 'units', value: '6', label: 'independent units' },
      { icon: 'whole', label: 'Sold as a whole' },
      { icon: 'place', label: 'Ultra-central Oradea' },
      { icon: 'owner', label: 'Direct from the owner' },
    ],

    opportunities: {
      titleLineOne: 'One property.',
      titleLineTwo: 'Multiple opportunities.',
      body: 'Suited to substantial projects that create value in a premium location, with strong yield potential.',
      items: ['Boutique hotel', 'Aparthotel', 'Clinic', 'Premium offices'],
      disclaimer:
        'These images are AI-generated, intended to illustrate possible uses of the property. Real, current photos can be found in the photo gallery.',
    },

    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'What you should know',
      items: [
        {
          q: 'Can the units be sold separately?',
          a: 'No. The property is sold exclusively as a single asset.',
        },
        {
          q: 'Do you work with real estate agencies?',
          a: 'No, the transaction is handled directly with the owner.',
        },
        {
          q: 'What is the price?',
          a: 'Price available upon request, after completing the form.',
        },
      ],
    },

    form: {
      eyebrow: 'Enquiry',
      sectionTitle: 'Interested in this property?',
      title: 'Request acquisition information',
      lead: 'A few short questions, so we know whether the opportunity fits you.',
      yes: 'Yes',
      fields: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        subject: 'Subject',
      },
      no: 'No',
      acquisition: 'Are you interested in acquiring the entire property?',
      agency: 'Do you represent a real estate agency?',
      buyerType: 'Buyer type',
      // Stable ids so a language switch never drops the current selection.
      buyerOptions: [
        { id: 'individual', label: 'Individual' },
        { id: 'investor', label: 'Investor' },
        { id: 'fund', label: 'Investment fund' },
      ],
      budget: 'Estimated budget range (optional)',
      budgetPlaceholder: 'Select a range',
      budgetOptions: [
        { id: 'under-500', label: 'under €500,000' },
        { id: '500-750', label: '€500,000 – €750,000' },
        { id: '750-1000', label: '€750,000 – €1,000,000' },
        { id: 'over-1000', label: 'over €1,000,000' },
      ],
      submit: 'Submit request',
      reassurance: 'We will only contact you regarding this opportunity.',
      requiredField: 'Please fill in this field.',
      requiredNotice: 'Please answer this question.',
      invalidEmail: 'Please enter a valid email address.',
      invalidPhone: 'Please enter a valid phone number.',
      requiredMark: '(required)',
      sending: 'Sending...',
      sendFailed:
        'The request could not be sent. Please email us at maniucentralproperty@gmail.com.',
      successTitle: 'Request sent',
      successBody:
        'Thank you. We will be in touch shortly regarding this opportunity.',
    },

    intro: {
      eyebrow: 'Overview',
      title: 'A truly remarkable property',
      paragraphs: [
        "In one of Oradea's most prestigious and sought-after areas, we present a truly remarkable property, designed to meet the most demanding investment and operational standards.",
        'This property represents a rare combination of strategic positioning, flawless execution, and cutting-edge technology, ready for immediate operation in premium segments: boutique hospitality, serviced apartments, or elite professional spaces.',
      ],
      uses: [
        { label: 'Boutique hospitality', icon: 'hotel' },
        { label: 'Serviced apartments', icon: 'apartment' },
        { label: 'Elite professional spaces', icon: 'office' },
      ],
    },

    architecture: {
      eyebrow: 'Architecture & Layout',
      title: 'Intelligently arranged around an interior courtyard',
      body: 'Built on a generous 795 sqm plot with a 363.1 sqm footprint, the property is intelligently configured into an ensemble of 6 independent apartments, each with its own identity. Arranged around an interior courtyard, it offers privacy, functionality, and a refined living experience rarely found in a central location.',
      stats: [
        { value: '795', unit: 'sqm', label: 'Plot', note: 'A generous footprint in an ultra-central area.' },
        { value: '363.1', unit: 'sqm', label: 'Built area', note: 'A compact, efficiently arranged structure.' },
        { value: '6', unit: '', label: 'Apartments', note: 'Independent units, each with its own identity.' },
        { value: '6', unit: '', label: 'Parking spaces', note: 'Private, within the property grounds.' },
      ],
    },

    execution: {
      eyebrow: 'Premium execution',
      title: 'Top materials, chosen to last',
      body: 'Every construction detail was selected to withstand intensive use without aesthetic compromise.',
      items: [
        {
          icon: 'window',
          title: 'German Veka 70 windows',
          text: 'Veka 70 profiles with Winkhaus hardware, for superior thermal and acoustic insulation.',
        },
        {
          icon: 'insulation',
          title: 'High-performance insulation',
          text: 'Petralana Petrafas 34 basalt mineral wool on the exterior walls, and STEICO wood wool in the ceilings.',
        },
        {
          icon: 'finishes',
          title: 'Carefully selected finishes',
          text: 'Chosen for durability and a contemporary aesthetic, consistent across every unit.',
        },
      ],
      brands: ['Veka', 'Winkhaus', 'Petralana', 'STEICO NaturePlus'],
    },

    technical: {
      eyebrow: 'Technical details',
      title: 'The specifications behind the finishes',
      body: 'The equipment, materials and construction solutions used in the renovation of the building.',
      gate: {
        icon: 'gate',
        title: 'Access & automation',
        text: 'Automated wood-laminate vehicle and pedestrian access gate, powered by FAAC equipment, an international leader in access automation and mobility systems.',
      },
      heating: {
        icon: 'boiler',
        title: 'Heating system',
        text: 'Daikin 24 kW condensing boiler.',
      },
      courtyard: {
        icon: 'paving',
        title: 'Courtyard',
        text: '300 sqm courtyard, paved with Starstone tiles, adhesive-bonded on a concrete screed, with waterproofing. Supports vehicle traffic up to 3.5 tons, ideal for the parking and interior courtyard area.',
      },
      walls: {
        icon: 'insulation',
        title: 'Exterior wall insulation',
        text: 'Petralana Petrafas 34 basalt mineral wool, high-performance thermal insulation, A1 fire reaction class.',
        extra:
          'Rigid boards made from molten basalt, with a declared thermal conductivity of 0.034 W/mK. The material is non-combustible, vapour-permeable and dimensionally stable, to the EN 13162 standard.',
        linkLabel: 'Product details',
      },
      ceilings: {
        icon: 'woodwool',
        title: 'Ceiling insulation',
        text: 'STEICO wood wool, a 100% natural product certified with the NaturePlus Eco-Label, an ecological solution supplied by Izolații Naturale.',
        sourceLabel: 'Source',
      },
      galleryTitle: 'During the works',
    },

    technology: {
      eyebrow: 'Technology & Smart Living',
      title: 'Ready for automated operation',
      body: 'The technical infrastructure allows the property to be managed entirely remotely, with no permanent on-site staff.',
      items: [
        {
          icon: 'smart',
          title: 'Gewiss Chorus EGO Smart Home',
          text: 'Integrated smart system for lighting, climate control, and usage scenarios.',
        },
        {
          icon: 'network',
          title: 'MikroTik IT infrastructure',
          text: 'Professional networking, sized for intensive use with separate networks per unit.',
        },
        {
          icon: 'access',
          title: 'Secure, automated access',
          text: 'Ideal for self check-in, with no physical presence required for key handover.',
        },
        {
          icon: 'security',
          title: 'Integrated Hikvision security',
          text: 'Complete video surveillance, intrusion alarm, and fire detection system.',
        },
      ],
    },

    comfort: {
      eyebrow: 'Absolute comfort',
      title: 'Consistent comfort in every unit',
      body: 'Each apartment has its own heating and cooling equipment, controlled independently.',
      items: [
        { icon: 'heating', title: 'Underfloor heating', text: 'Complemented by individual heating units for every apartment.' },
        { icon: 'ac', title: 'Daikin air conditioning', text: 'Premium climate control installed in every single unit.' },
        { icon: 'ventilation', title: 'Soler & Palau ventilation', text: 'Silent Dual systems, running intelligently and quietly.' },
        { icon: 'shutters', title: 'Exterior shutters', text: 'Electrically operated aluminium shutters for privacy and thermal control.' },
      ],
    },

    energy: {
      eyebrow: 'Efficiency & sustainability',
      badge: 'Energy Class',
      badgeValue: 'B',
      title: 'Optimized operating costs',
      items: [
        'Certified Energy Class B',
        'Natural, breathable building materials',
        'Operating costs optimized for intensive use',
      ],
    },

    exterior: {
      eyebrow: 'Exterior & amenities',
      title: 'Landscaped courtyard, private parking',
      body: 'The outdoor space is part of the property experience, not an afterthought.',
      items: [
        { icon: 'parking', title: '6 parking spaces', text: 'Private and on-site, a genuine privilege in an ultra-central location.' },
        { icon: 'garden', title: 'Landscaped courtyard', text: 'Maintained green space with sheltered areas for outdoor living.' },
        { icon: 'expand', title: 'Expansion potential', text: 'Room to expand or reconfigure the existing spaces.' },
      ],
    },

    units: {
      eyebrow: 'Apartments',
      title: 'Six independent units, each with its own identity',
      body: 'Explore every unit in detail through its complete photo gallery.',
      photosLabel: 'photos',
      view: 'View gallery',
      cellarNote: 'Technical and storage space',
    },

    unit: {
      back: 'Back to apartments',
      backHome: 'Back to overview',
      gallery: 'Photo gallery',
      galleryNote: 'Select any photograph to view it at full size.',
      photos: 'photos',
      prev: 'Previous photo',
      next: 'Next photo',
      closeLightbox: 'Close gallery',
      of: 'of',
      enquire: 'Request details',
      nextUnit: 'Next',
      otherUnits: 'Other units',
      notFound: 'Unit not found',
      notFoundBody: 'The unit you are looking for does not exist. Return to the overview page.',

      plan: 'Floor plan',
      planNote: 'Cadastral survey, December 2025. Select to enlarge.',
      planZoom: 'Enlarge the floor plan',
      roomsLabel: 'Rooms',
      areaLabel: 'Usable area',
      landLabel: 'Land share',
      scheduleTitle: 'Room schedule',
      scheduleRoom: 'Room',
      scheduleArea: 'Area',
      totalLabel: 'Total usable area',
      sqm: 'sqm',
    },

    investment: {
      eyebrow: 'Investment value',
      title: 'A rare, fully modernized asset',
      items: [
        { title: 'Ultra-central asset', text: 'A rare, ultra-central property, fully modernized and ready to operate.' },
        { title: 'Total flexibility', text: 'Complete operational flexibility, adaptable to any business model.' },
        { title: 'Premium monetization', text: 'High yield in short-term rental or stable income in long-term letting.' },
        { title: 'Fractional exit', text: 'The option to sell units individually, for gradual liquidity.' },
      ],
      conclusionTitle: 'Conclusion',
      conclusion:
        "A property that doesn't just meet today's market demands, it anticipates them. A secure, elegant, and scalable investment in a location that guarantees long-term value.",
    },

    contact: {
      eyebrow: 'Contact',
      title: 'Arrange a viewing',
      body: 'For the full presentation file, detailed plans, and commercial terms, please get in touch.',
      cta: 'Request details',
      addressLabel: 'Address',
      address: '65 Iuliu Maniu Street, Oradea, Bihor County, Romania',
      emailLabel: 'Email',
      email: 'maniucentralproperty@gmail.com',
      placeholder: 'to follow',
      reach: 'Contact us',

      pageTitle: 'Contact us',
      pageLead:
        'You can reach us through the contact form or using our contact details.',
      detailsTitle: 'Contact details',
      formTitle: 'Request',
      mapTitle: 'Property location',
      openInMaps: 'Open in Google Maps',
    },

    privacy: {
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      updated: 'Last updated: 27 August 2026',
      sections: [
        {
          title: 'Data controller',
          intro: 'Data controller:',
          lines: [
            'Gere Ferencz-Tivadar, through CAPITOLIUM TOURS SRL',
            'Registered office: Str. Avram Iancu, Nr. 8, Oradea, Bihor County, Romania',
            'Registration Number: 6576836',
          ],
          email: 'gereferencz@yahoo.com',
          emailLabel: 'Email:',
        },
        {
          title: 'What data we collect',
          intro:
            'Through the contact form on this site, we collect: your name, email address, phone number, subject (optional) and message, and your answers to the qualifying questions (purchase interest, buyer type, estimated budget range).',
          outro:
            'We also automatically collect technical browsing data (e.g. pages visited, visit duration) via Google Tag Manager and Google Analytics, with your consent given through the cookie banner.',
        },
        {
          title: 'Purpose of processing',
          intro:
            'Data collected is used exclusively to respond to your inquiries about the property presented on this site, contact you regarding the investment opportunity requested, and analyze site traffic to improve user experience (only with your cookie consent).',
        },
        {
          title: 'Legal basis',
          intro:
            'Processing is based on your consent, given by voluntarily completing the contact form and/or accepting cookies.',
        },
        {
          title: 'Data recipients',
          intro:
            'Form submissions are processed through the third-party service Web3Forms, solely for message delivery to the controller. Browsing data is processed through Google (Tag Manager, Analytics), per their respective privacy policies.',
        },
        {
          title: 'Retention period',
          intro:
            'Data submitted through the form is kept as long as necessary to handle your request, but no longer than 2 years from the last interaction, unless otherwise required by law.',
        },
        {
          title: 'Your rights',
          intro:
            'Under GDPR (Regulation (EU) 2016/679), you have the right to: access your personal data, request rectification or deletion, withdraw consent at any time, object to processing, and file a complaint with the Romanian Data Protection Authority (ANSPDCP).',
          outro: 'To exercise these rights, contact us at:',
          email: 'gereferencz@yahoo.com',
        },
        {
          title: 'Cookies',
          intro:
            'This site uses cookies for traffic analysis. You can manage cookie preferences via the banner shown on first visit or through your browser settings.',
        },
      ],
    },

    footer: {
      tagline: 'An exclusive property in the heart of Oradea.',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      disclaimer:
        'Photographs and information are presentational and do not constitute a contractual offer.',
    },

    a11y: {
      switchTo: 'Switch to Romanian',
      home: 'Maniu 65 Central, home page',
      openGallery: 'Open photo',
    },
  },
}
