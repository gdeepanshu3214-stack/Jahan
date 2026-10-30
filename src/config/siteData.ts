import { ServiceDetail, CoverageZone, ShipmentRecord, MigrationChecklistItem } from '../types';
import { PHOTO_ASSETS } from './assets';

export const COMPANY_INFO = {
  name: 'Jahan Express',
  legalName: 'Jahan Express Solution',
  proprietor: 'Mr. Virender Kumar',
  establishedYear: 2017,
  industryExperienceSince: 1995,
  tagline: 'Connecting India to a Wider World',
  heroHeading: 'Every shipment. A world of possibilities.',
  heroSubhead: 'Road, air and ocean freight, with personal support from pickup to delivery.',
  
  // Contacts
  primaryPhone: '+91 9810990774',
  primaryPhoneFormatted: '+91 98109 90774',
  primaryPhoneTel: 'tel:+919810990774',
  primaryEmail: 'jexpsol@gmail.com',
  
  // Addresses - clean customer-facing values
  workAddress: {
    line1: 'A-96/1 Gf, Maya Puri Industrial Area, Phase-II',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110064',
    country: 'India',
    label: 'Operations & Dispatch Depot'
  },
  registeredAddress: {
    line1: 'R-29, Vani Vihar, Uttam Nagar',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110059',
    country: 'India',
    label: 'Registered Office'
  },
  
  // Operations & Hours
  operatingHours: 'Monday – Saturday, 10:00 AM – 8:00 PM IST',
  operatingHoursShort: 'Mon–Sat: 10 AM – 8 PM',
  
  // Philosophy
  mission: 'To deliver reliable, straightforward freight and student shipping across India with disciplined custody, clear timing, and transparent pricing.',
  vision: 'To connect manufacturing hubs with northern regional corridors, Himalayan valleys, and island ports through accessible, responsive freight services.',
  udyamRegistration: 'UDYAM-DL-08-0012492'
};

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'road-freight',
    slug: 'road-freight',
    name: 'Road Freight',
    tagline: 'Across India, on time and with care.',
    shortDescription: 'Full and part truckload surface transport connecting Delhi-NCR to northern states and national highway corridors.',
    longDescription: 'Jahan Express provides dependable road transport solutions for commercial shipments, industrial components, and bulk cargo. With scheduled line-hauls connecting Delhi-NCR to northern states and major industrial belts, we coordinate on-site collection, transit updates, and reliable destination handovers.',
    highlights: [
      'Full Truckload (FTL) and Part Truckload (PTL) coordination',
      'Specialized line-haul network across North India',
      'Doorstep collection and scheduled delivery coordination',
      'Standardized cargo securing and weather-protected transit'
    ],
    idealFor: [
      'Commercial manufacturers and distributors',
      'Industrial equipment and machinery spare parts',
      'Warehouse-to-warehouse inventory movements',
      'Regular regional consignments needing ground transport'
    ],
    cargoExamples: [
      'Industrial machinery & spare parts',
      'Packaged retail goods & FMCG cartons',
      'Textiles, apparel & hardware supplies',
      'Raw materials and commercial goods'
    ],
    processSteps: [
      { title: 'Booking & Dispatch Plan', desc: 'Route evaluation, weight calculation, and vehicle scheduling.' },
      { title: 'Secure On-Site Loading', desc: 'Cargo check, protective packaging review, and vehicle loading.' },
      { title: 'Highway Transit Coordination', desc: 'Checkpoint tracking and status updates along verified transit corridors.' },
      { title: 'Destination Delivery', desc: 'Doorstep offloading and proof-of-delivery signoff.' }
    ],
    availabilityNotice: 'Transit times depend on route distance, weather, highway checkposts, and vehicle category. Specific schedules confirmed upon booking.',
    faqs: [
      {
        question: 'Do you handle both Part Truckload (PTL) and Full Truckload (FTL)?',
        answer: 'Yes, we manage both consolidated part loads (PTL) and dedicated full truckloads (FTL) depending on shipment size and urgency.'
      },
      {
        question: 'What documents are needed for inter-state road freight?',
        answer: 'Inter-state commercial shipments in India generally require a commercial invoice, GST E-Way Bill, and a consignee packing list.'
      }
    ],
    imageAlt: 'White commercial freight truck on a scenic highway with mountains in the background'
  },
  {
    id: 'air-freight',
    slug: 'air-freight',
    name: 'Air Freight',
    tagline: 'Fast, secure and globally connected.',
    shortDescription: 'Time-sensitive domestic air cargo and international air freight coordination for urgent commercial consignments.',
    longDescription: 'When transit time is critical, Jahan Express coordinates domestic air cargo and international freight consignments through premier aviation gateways. From airport transfers to end-to-end door delivery, our team manages cargo space, security compliance, and flight manifests.',
    highlights: [
      'Domestic express air cargo connecting major Indian airport hubs',
      'Cross-border international air cargo coordination',
      'Same-day air connectivity subject to route and airline availability',
      'Dedicated handling for fragile, valuable, or urgent consignments'
    ],
    idealFor: [
      'High-value goods and precision instruments',
      'Urgent commercial samples, documents, and prototypes',
      'Time-sensitive electronics and replacement parts',
      'Cross-border consignments requiring swift clearance'
    ],
    cargoExamples: [
      'High-value electronics & communication gear',
      'Critical replacement parts & prototypes',
      'Pharmaceutical & temperature-stable medical supplies',
      'Urgent documents & commercial samples'
    ],
    processSteps: [
      { title: 'Cargo Acceptance & Weighing', desc: 'Weight and volumetric verification with airline security checks.' },
      { title: 'Airport Handover & Airway Bill', desc: 'Cargo handover, Airway Bill (AWB) generation, and flight loading.' },
      { title: 'Air Transit & Hub Arrival', desc: 'Direct flight transit and offloading at destination airport cargo bay.' },
      { title: 'Destination Delivery', desc: 'Local delivery handover or consignee collection at destination cargo depot.' }
    ],
    availabilityNotice: 'Same-day and express air services are subject to flight schedules, cargo acceptance cut-off times, and carrier capacity. Not a universal guarantee.',
    faqs: [
      {
        question: 'Is same-day air delivery available to all Indian cities?',
        answer: 'Same-day air delivery is available only between select Tier-1 metro hubs with multiple direct daily flights, subject to early morning cargo acceptance.'
      },
      {
        question: 'How is chargeable weight calculated for air freight?',
        answer: 'Air cargo uses the greater of actual gross weight (kg) or volumetric weight (Length x Width x Height in cm divided by 5000).'
      }
    ],
    imageAlt: 'Cargo aircraft on airport tarmac being loaded with freight pallets under blue sky'
  },
  {
    id: 'ocean-freight',
    slug: 'ocean-freight',
    name: 'Ocean Freight',
    tagline: 'Reliable sea freight for bigger possibilities.',
    shortDescription: 'Cost-effective sea cargo coordination for containerized international trade and large-volume consignments.',
    longDescription: 'For substantial shipments and international trade where transit economy outweighs urgency, Jahan Express coordinates ocean freight services. We assist with container allocation, port drayage, and maritime transit management connecting Indian commercial gateways with worldwide ports.',
    highlights: [
      'Full Container Load (FCL) and Less than Container Load (LCL) coordination',
      'Port-to-port and integrated multimodal door-to-port solutions',
      'Export and import shipping documentation support',
      'Cost-efficient transport for bulky or heavy commercial volume'
    ],
    idealFor: [
      'Export and import trading enterprises',
      'Heavy machinery and raw material bulk shipments',
      'Textiles, home goods, and furniture consignments',
      'Cost-conscious global shipments with flexible delivery windows'
    ],
    cargoExamples: [
      'Industrial machinery, heavy equipment & hardware',
      'Raw materials, plastics, metals & bulk manufacturing supplies',
      'Textiles, apparel, home goods & handicrafts',
      'Containerized commercial commodities'
    ],
    processSteps: [
      { title: 'Container Allocation', desc: 'Selection between 20ft/40ft FCL or consolidated LCL container space.' },
      { title: 'Factory / Port Drayage', desc: 'Transport from origin facility or hub to coastal port terminal.' },
      { title: 'Vessel Loading & Sea Voyage', desc: 'Container stowage, customs manifest check, and bill of lading issuance.' },
      { title: 'Port Arrival & Handover', desc: 'Destination port offloading, container release, and ground delivery.' }
    ],
    availabilityNotice: 'Sea freight transit durations and sailing schedules vary by shipping lines, canal transit conditions, and port terminal wait times.',
    faqs: [
      {
        question: 'What is the difference between FCL and LCL?',
        answer: 'FCL (Full Container Load) dedicates an entire shipping container (20ft or 40ft) exclusively to your cargo. LCL (Less than Container Load) consolidates your goods with cargo from other shippers in a shared container.'
      },
      {
        question: 'Do you assist with maritime documentation?',
        answer: 'Yes, we assist with shipping manifests, commercial bills of lading, and port clearance procedures.'
      }
    ],
    imageAlt: 'Large container ship carrying multi-colored shipping containers across open water'
  },
  {
    id: 'student-express',
    slug: 'student-express',
    name: 'Student Express',
    tagline: 'Your belongings, to every new beginning.',
    shortDescription: 'Dedicated student relocation service for moving textbooks, musical instruments, and personal luggage between home and campus.',
    longDescription: 'Starting a new university semester or graduating from campus should be a smooth transition. Jahan Express Student Express is tailored specifically for students moving between home and university hostels across India. We provide doorstep pickup from hostel gates, weather-protected handling, and delivery directly to your family home.',
    highlights: [
      'Doorstep pickup directly from campus hostels or family homes',
      'Safe transport for study books, clothing, bedding, and room items',
      'Specialized care for musical instruments and sensitive gear',
      'Tailored student pricing with transparent baggage rates',
      'Weather-protected wrapping and sturdy carton handling'
    ],
    idealFor: [
      'College students shifting into university hostels or PG rooms',
      'Graduates transporting books, bedding, and luggage home',
      'Students moving between major educational hubs across India',
      'Students transporting delicate instruments, monitors, or study equipment'
    ],
    cargoExamples: [
      'Textbooks, study materials & personal libraries',
      'Clothing, winter wear, shoes & bedding essentials',
      'Guitars, keyboards & musical instruments in cases',
      'Monitors, desktop peripherals & study desk items'
    ],
    processSteps: [
      { title: 'Student Quote & Booking', desc: 'Share your pickup hostel address, destination, and package count.' },
      { title: 'Hostel Collection', desc: 'Scheduled collection directly from your campus gate or designated visitor desk.' },
      { title: 'Protected Transit', desc: 'Careful handling with secure strapping and weather protection.' },
      { title: 'Home Doorstep Delivery', desc: 'Safe delivery to your family home address before semester break ends.' }
    ],
    availabilityNotice: 'Student concession rates are subject to student verification upon booking. Packaging materials can be arranged with prior notice.',
    faqs: [
      {
        question: 'Can you pick up luggage directly from my hostel room?',
        answer: 'Where campus security permits visitor entry, our team can coordinate pickup from your hostel. In campuses with restricted entry, pickup is arranged at the main campus gate or designated visitor parcel desk.'
      },
      {
        question: 'How should I pack fragile musical instruments or electronics?',
        answer: 'We recommend hard cases for instruments with bubble wrap cushioning. Laptops and vital identity documents should always be carried personally. For monitors and electronics, double-box cushioning is advised.'
      },
      {
        question: 'How do I request student rates?',
        answer: 'Select "Student Express" in our quote form and mention your campus details to receive our student package rates.'
      }
    ],
    imageAlt: 'University student packing textbooks and personal belongings into a cardboard box in student room'
  }
];

export const COVERAGE_ZONES: CoverageZone[] = [
  {
    id: 'north-india',
    name: 'North India Core Network',
    category: 'North India Hub',
    coverageDescription: 'Scheduled daily line-hauls connecting Delhi-NCR to industrial and commercial hubs across northern states.',
    keyHubs: ['Delhi NCR (Gurugram, Noida, Faridabad)', 'Chandigarh Tricity', 'Ludhiana', 'Amritsar', 'Jaipur', 'Lucknow', 'Kanpur', 'Dehradun', 'Jammu'],
    transportModes: ['Road', 'Air'],
    terrainNotes: 'High-frequency highway line-hauls with regular scheduled dispatches.'
  },
  {
    id: 'leh-ladakh',
    name: 'Leh & Ladakh Special Zone',
    category: 'Special Zone',
    coverageDescription: 'High-altitude logistics navigating mountain passes with seasonal weather monitoring and air-bridge support.',
    keyHubs: ['Leh Town', 'Kargil', 'Nubra Valley', 'Diskit', 'Zanskar'],
    transportModes: ['Road', 'Air'],
    terrainNotes: 'Winter road passes are subject to snow closures; during closures, priority air freight is coordinated.',
    specialNotice: 'Consignments to Ladakh require weather-resistant packaging and recipient contact coordination.'
  },
  {
    id: 'port-blair',
    name: 'Port Blair & Andaman Islands',
    category: 'Special Zone',
    coverageDescription: 'Island freight coordination via mainland air cargo from Kolkata/Chennai and coastal sea freight.',
    keyHubs: ['Port Blair', 'Havelock (Swaraj Dweep)', 'Neil Island', 'Diglipur'],
    transportModes: ['Air', 'Ocean'],
    terrainNotes: 'Multimodal coordination through Chennai and Kolkata maritime gateways and Veer Savarkar Airport.',
    specialNotice: 'Ocean shipments require advance manifest scheduling; air cargo operates on scheduled commercial airlines.'
  },
  {
    id: 'pan-india',
    name: 'Pan-India Domestic Corridors',
    category: 'Domestic Network',
    coverageDescription: 'Connecting western, southern, and eastern economic centers to northern manufacturing corridors.',
    keyHubs: ['Mumbai / MMR', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata'],
    transportModes: ['Road', 'Air'],
    terrainNotes: 'Long-haul interstate movements coordinated via national logistics corridors.'
  },
  {
    id: 'international-gateway',
    name: 'International Gateways',
    category: 'International Gateway',
    coverageDescription: 'Air and ocean cargo handling connecting Indira Gandhi International Airport (DEL), Nhava Sheva (JNPT), and Mundra Port.',
    keyHubs: ['Delhi Air Cargo Terminal', 'Nhava Sheva (JNPT)', 'Mundra Port', 'Chennai Port'],
    transportModes: ['Air', 'Ocean'],
    specialNotice: 'Customs and trade documentation assistance provided for commercial entities.'
  }
];

export const DEMO_SHIPMENTS: Record<string, ShipmentRecord> = {
  'JHN-84920-IN': {
    trackingNumber: 'JHN-84920-IN',
    service: 'Road Freight (North India Line-haul)',
    origin: 'New Delhi',
    destination: 'Ludhiana, Punjab',
    senderNameMasked: 'Apex M*** Pvt Ltd',
    recipientNameMasked: 'V.K. E*** Stores',
    currentStatus: 'In Transit',
    estimatedDelivery: '31 Oct 2026, 05:00 PM IST',
    lastUpdated: '30 Oct 2026, 09:42 AM IST',
    packagesCount: 4,
    weightKg: 85,
    isDemo: true,
    checkpoints: [
      {
        timestamp: '29 Oct 2026, 04:30 PM IST',
        location: 'Maya Puri Hub, New Delhi',
        status: 'Shipment Booked & Manifested',
        description: 'Cargo picked up from consignor and safely loaded at Maya Puri dispatch center.',
        completed: true
      },
      {
        timestamp: '29 Oct 2026, 09:15 PM IST',
        location: 'Kundli Border Highway Checkpoint',
        status: 'Departed Delhi Line-Haul',
        description: 'Vehicle cleared interstate toll and proceeded onto NH44 northern transit corridor.',
        completed: true
      },
      {
        timestamp: '30 Oct 2026, 05:20 AM IST',
        location: 'Ambala Transit Junction, Haryana',
        status: 'In Transit — Highway Checkpoint',
        description: 'Scheduled transit inspection completed. All 4 cartons intact and secure.',
        completed: true,
        current: true
      },
      {
        timestamp: 'Expected 31 Oct 2026, 11:00 AM IST',
        location: 'Ludhiana Central Delivery Hub, Punjab',
        status: 'Arriving at Destination Hub',
        description: 'Scheduled for hub offloading and local van dispatch to recipient facility.',
        completed: false
      },
      {
        timestamp: 'Expected 31 Oct 2026, 04:30 PM IST',
        location: 'Industrial Area, Ludhiana',
        status: 'Out for Final Delivery',
        description: 'Delivery handover to consignee with proof-of-delivery signature.',
        completed: false
      }
    ]
  },
  'JHN-29104-DL': {
    trackingNumber: 'JHN-29104-DL',
    service: 'Student Express (Home-to-Hostel)',
    origin: 'New Delhi',
    destination: 'Chandigarh',
    senderNameMasked: 'P*** Sharma (Family)',
    recipientNameMasked: 'A*** Sharma (Student)',
    currentStatus: 'Out for Delivery',
    estimatedDelivery: '30 Oct 2026, 02:00 PM IST',
    lastUpdated: '30 Oct 2026, 08:15 AM IST',
    packagesCount: 2,
    weightKg: 32,
    isDemo: true,
    checkpoints: [
      {
        timestamp: '28 Oct 2026, 11:00 AM IST',
        location: 'Uttam Nagar, New Delhi',
        status: 'Hostel Booking Confirmed',
        description: 'Student Express package booked with student tariff applied.',
        completed: true
      },
      {
        timestamp: '28 Oct 2026, 04:45 PM IST',
        location: 'Maya Puri Hub, New Delhi',
        status: 'Protective Packaging Checked',
        description: 'Cartons weather-wrapped and labeled with campus hostel room identifier.',
        completed: true
      },
      {
        timestamp: '29 Oct 2026, 07:30 PM IST',
        location: 'Sector 26 Hub, Chandigarh',
        status: 'Arrived at City Hub',
        description: 'Consignment received at regional delivery depot.',
        completed: true
      },
      {
        timestamp: '30 Oct 2026, 08:15 AM IST',
        location: 'Sector 14 University Gate, Chandigarh',
        status: 'Out for Campus Delivery',
        description: 'Delivery personnel in contact with student for gate collection handover.',
        completed: true,
        current: true
      },
      {
        timestamp: 'Expected 30 Oct 2026, 01:30 PM IST',
        location: 'Campus Hostel Block 4',
        status: 'Delivered',
        description: 'Student signature and receipt confirmation.',
        completed: false
      }
    ]
  },
  'JHN-73019-LEH': {
    trackingNumber: 'JHN-73019-LEH',
    service: 'Special Zone Air & Mountain Cargo',
    origin: 'New Delhi',
    destination: 'Leh, Ladakh',
    senderNameMasked: 'Himalayan S*** Supplies',
    recipientNameMasked: 'T*** Namgyal',
    currentStatus: 'Delivered',
    estimatedDelivery: '29 Oct 2026, 03:40 PM IST',
    lastUpdated: '29 Oct 2026, 03:40 PM IST',
    packagesCount: 1,
    weightKg: 18,
    isDemo: true,
    checkpoints: [
      {
        timestamp: '27 Oct 2026, 08:00 AM IST',
        location: 'New Delhi Air Cargo Terminal',
        status: 'Airway Manifest Accepted',
        description: 'High-altitude protected package screened and manifested for Leh flight.',
        completed: true
      },
      {
        timestamp: '27 Oct 2026, 11:20 AM IST',
        location: 'Kushok Bakula Rimpochee Airport, Leh',
        status: 'Air Freight Landed in Leh',
        description: 'Consignment safely offloaded at Leh airport cargo bay.',
        completed: true
      },
      {
        timestamp: '28 Oct 2026, 01:15 PM IST',
        location: 'Leh Main Bazar Depot',
        status: 'Local Delivery Dispatch',
        description: 'Assigned to mountain route delivery vehicle.',
        completed: true
      },
      {
        timestamp: '29 Oct 2026, 03:40 PM IST',
        location: 'Fort Road, Leh, Ladakh',
        status: 'Delivered',
        description: 'Received in good condition. Signed by recipient Mr. T. Namgyal.',
        completed: true,
        current: true
      }
    ]
  }
};

export const MIGRATION_CHECKLIST: MigrationChecklistItem[] = [
  {
    sourceUrl: 'http://jahanexpress.com/index.html',
    originalSection: 'Header / Brand Slogan',
    originalClaimOrData: '“Connecting India to a wider world” with all-caps mission slogans.',
    statusInNewSite: 'Preserved & Refined',
    newLocation: 'Header brand subtitle, About page, and Hero tag',
    notes: 'Preserved as official brand motto, polished into elegant professional hierarchy.'
  },
  {
    sourceUrl: 'http://jahanexpress.com/index.html & about.html',
    originalSection: 'Establishment & Experience Counters',
    originalClaimOrData: 'Conflicting claims: 2017 establishment, 29+ years, 35 years experience.',
    statusInNewSite: 'Preserved As Provisional',
    newLocation: 'About page, Home about teaser, and Footer',
    notes: 'Accurate reconciliation: Founded 2017 under proprietor Mr. Virender Kumar, who brings personal logistics experience since 1995.'
  },
  {
    sourceUrl: 'http://jahanexpress.com/services.html',
    originalSection: 'Core Services Listing',
    originalClaimOrData: 'Road Freight, Student Express, Air Freight, Ocean Freight.',
    statusInNewSite: 'Preserved & Refined',
    newLocation: 'Dedicated /services overview and 4 individual detail routes (/services/*)',
    notes: 'Preserved all 4 core services; expanded with realistic cargo examples, process steps, and clear availability conditions.'
  },
  {
    sourceUrl: 'http://jahanexpress.com/index.html',
    originalSection: 'Same-Day Air Delivery Claim',
    originalClaimOrData: 'Claimed same-day air delivery on homepage.',
    statusInNewSite: 'Preserved As Provisional',
    newLocation: 'Air Freight page & FAQ',
    notes: 'Conditioned honestly: same-day delivery is offered subject to flight availability, early morning cargo cut-offs, and route feasibility; not an unconditional blanket guarantee.'
  },
  {
    sourceUrl: 'http://jahanexpress.com/index.html',
    originalSection: 'Student Express & Concessions',
    originalClaimOrData: 'Home-to-hostel and hostel-to-home, books, instruments, student concessions.',
    statusInNewSite: 'Preserved & Refined',
    newLocation: 'Dedicated /services/student-express route & Quote form options',
    notes: 'Full student-friendly flow with directional selection (home-to-hostel vs hostel-to-home) and student rate quotation.'
  },
  {
    sourceUrl: 'http://jahanexpress.com/contact.html',
    originalSection: 'Phone Numbers',
    originalClaimOrData: 'Common phone +91 9810990774; conflicting numbers +91 9810335025 & +91 9312839582.',
    statusInNewSite: 'Preserved As Provisional',
    newLocation: 'Contact page & site header/footer',
    notes: 'Primary common number +91 9810990774 used for active call links; alternate numbers kept in review documentation.'
  },
  {
    sourceUrl: 'http://jahanexpress.com/contact.html',
    originalSection: 'Addresses',
    originalClaimOrData: 'Maya Puri Work Address vs Uttam Nagar Registered Address (R 29 vs R 29 A).',
    statusInNewSite: 'Preserved & Refined',
    newLocation: 'Contact page & Footer',
    notes: 'Single owner-approved line shown on public pages (R-29, Vani Vihar, Uttam Nagar) alongside the Maya Puri operational hub.'
  },
  {
    sourceUrl: 'http://jahanexpress.com/contact.html',
    originalSection: 'Operating Hours',
    originalClaimOrData: 'Monday–Saturday 10 AM–8 PM IST.',
    statusInNewSite: 'Preserved & Refined',
    newLocation: 'Contact page & Footer',
    notes: 'Accurately displayed without misleading 24/7 human support claims.'
  }
];

export const GENERAL_FAQS = [
  {
    category: 'Booking & Quotes',
    question: 'How do I request a freight or shipping quote from Jahan Express?',
    answer: 'You can use our 3-step "Get a quote" form on this website, call our team directly at +91 9810990774, or email jexpsol@gmail.com with your package weight, dimensions, and route. Our dispatch desk will confirm current rates and vehicle availability.'
  },
  {
    category: 'Booking & Quotes',
    question: 'Where is your dispatch depot and what are your operating hours?',
    answer: 'Our operational depot is situated at A-96/1 Gf, Maya Puri Industrial Area, Phase-II, New Delhi – 110064. Our customer desk is open Monday through Saturday from 10:00 AM to 8:00 PM IST (closed on Sundays).'
  },
  {
    category: 'Network & Coverage',
    question: 'Which areas do you specialize in within India?',
    answer: 'Jahan Express specializes in scheduled line-hauls across North India (Delhi NCR, Haryana, Punjab, Himachal Pradesh, Jammu & Kashmir, Uttarakhand, and Rajasthan). We also coordinate specialized high-altitude routes to Leh & Ladakh, and island sea freight to Port Blair (Andaman Islands).'
  },
  {
    category: 'Student Express',
    question: 'What is Student Express and how does hostel pickup work?',
    answer: 'Student Express is our tailored relocation service for college students moving between home and university hostels. Where campus security permits, collection is scheduled directly from hostel rooms; otherwise pickup takes place at the main campus gate or designated visitor parcel desk.'
  },
  {
    category: 'Tracking & Support',
    question: 'How does shipment tracking work on Jahan Express?',
    answer: 'When your consignment is manifested at our hub, you receive a tracking reference (such as JHN-84920-IN). Entering this number on our Track page displays verified transit checkpoints from dispatch to final delivery.'
  },
  {
    category: 'Packaging',
    question: 'What packing standards do you recommend for fragile or heavy items?',
    answer: 'We recommend double-walled corrugated boxes with internal bubble wrap or foam cushioning. For high-altitude shipments to Leh & Ladakh, weather-resistant plastic wrapping is strongly recommended to protect against cold moisture.'
  }
];
