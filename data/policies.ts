export const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export const POLICY_DATABASE = [
  {
    name: "Pradhan Mantri Awas Yojana (Urban)",
    region: "All India",
    description: "Provides central assistance to Urban Local Bodies (ULBs) and other implementing agencies for providing housing to eligible families.",
    rules: `
           - GOAL: Housing for All.
           - ELIGIBILITY SLABS:
             a) EWS (Economically Weaker Section): Annual Household Income up to ₹3,00,000.
             b) LIG (Low Income Group): Annual Household Income ₹3,00,001 to ₹6,00,000.
             c) MIG-I (Mid Income Group): Income ₹6,00,001 to ₹12,00,000.
           - CRITICAL CONDITIONS:
             * For EWS and LIG, the house MUST be owned by a female member or in joint ownership with a female member.
             * Applicant family must NOT own a pucca house anywhere in India.
           - CITATION: Ministry of Housing & Urban Affairs Guidelines 2021, Section 2.1.`
  },
  {
    name: "PM-KISAN Samman Nidhi",
    region: "All India",
    description: "A Central Sector Scheme to provide income support to all landholding farmers' families in the country to supplement their financial needs.",
    rules: `
           - GOAL: Income support for farmers.
           - ELIGIBILITY: Landholding farmer families with cultivable land up to 2 hectares.
           - EXCLUSION CRITERIA (Strict):
             * Institutional Landholders.
             * Farmer families where one member is an Income Tax Payer.
             * Professionals (Doctors, Engineers, Lawyers, CAs) and serving/retired Govt employees.
           - CITATION: PM-KISAN Operational Guidelines, Para 3 (Exclusion Categories).`
  },
  {
    name: "Post-Matric Scholarship for SC Students",
    region: "All India",
    description: "Financial assistance to Scheduled Caste students studying at post-matriculation or post-secondary stage to enable them to complete their education.",
    rules: `
           - GOAL: Financial assistance for education.
           - ELIGIBILITY:
             a) Student must belong to Scheduled Caste (SC).
             b) Parent/Guardian's annual income should not exceed ₹2,50,000.
             c) Must be pursuing post-matriculation courses in recognized institutions.
           - CITATION: Ministry of Social Justice & Empowerment, Scheme Guidelines 2023, Clause 4(iii).`
  },
  {
    name: "Ayushman Bharat - PMJAY",
    region: "All India",
    description: "World's largest health insurance/assurance scheme fully financed by the government, providing a cover of Rs. 5 lakhs per family per year.",
    rules: `
           - GOAL: Health coverage of ₹5 Lakhs/family.
           - ELIGIBILITY: Based on SECC 2011 Deprivation Criteria (D1-D7).
           - AUTO-INCLUSION: Households without shelter, destitute, legally released bonded labour, primitive tribal groups.
           - EDGE CASE: No cap on family size or age.
           - CITATION: National Health Authority Guidelines, Annexure A.`
  },
  {
    name: "Mudra Yojana (Business Loan)",
    region: "All India",
    description: "PMMY is a scheme set up to provide loans up to 10 lakh to the non-corporate, non-farm small/micro enterprises.",
    rules: `
           - GOAL: Business loans for non-corporate, non-farm small/micro enterprises.
           - LOAN CATEGORIES:
             a) 'Shishu': Loans up to ₹50,000 (For new businesses).
             b) 'Kishor': Loans ₹50,001 to ₹5,00,000.
             c) 'Tarun': Loans ₹5,00,001 to ₹10,00,000.
           - CITATION: PMMY Annual Report 2022-23, Lending Norms.`
  },
  {
      name: "Ladli Behna Yojana (Madhya Pradesh)",
      region: "Madhya Pradesh",
      description: "A scheme by the MP Government to strengthen women economically, improve their health and nutrition status and their role in the family.",
      rules: `
           - GOAL: Economic independence for women in MP.
           - ELIGIBILITY:
             a) Resident of Madhya Pradesh.
             b) Married (including widowed/divorced) women aged 21-60 years.
             c) Annual Family Income < ₹2,50,000.
           - EXCLUSIONS:
             * Income Tax payers.
             * Family member in Govt service.
             * Owning 4-wheeler vehicle.
           - CITATION: MP WCD Dept Guidelines 2023.`
  },
  {
      name: "Kalia Scheme (Odisha)",
      region: "Odisha",
      description: "Krushak Assistance for Livelihood and Income Augmentation scheme to accelerate agricultural prosperity and reduce poverty.",
      rules: `
           - GOAL: Support for cultivators and landless agri-laborers.
           - ELIGIBILITY:
             a) Small/Marginal farmers (1-2 hectares).
             b) Landless agricultural households.
           - EXCLUSIONS:
             * Tax Payers.
             * Govt Employees.
           - CITATION: Odisha Dept of Agriculture 2019.`
  },
  {
      name: "Rythu Bandhu (Telangana)",
      region: "Telangana",
      description: "Agriculture investment support scheme for landholding farmers.",
      rules: `
           - GOAL: Investment Support for Agriculture.
           - BENEFIT: ₹5000 per acre per season.
           - ELIGIBILITY:
             a) Must be a resident of Telangana.
             b) Must own farming land (pattadar passbook holder).
           - EXCLUSIONS:
             * Tenant farmers are NOT eligible.
             * Commercial land is NOT eligible.
           - CITATION: Telangana Dept of Agriculture, Rythu Bandhu Guidelines.`
  },
  {
      name: "Kanyashree Prakalpa (West Bengal)",
      region: "West Bengal",
      description: "A conditional cash transfer scheme aimed at improving the status and well-being of the girl child.",
      rules: `
           - GOAL: Prevent child marriage and encourage education.
           - CATEGORIES:
             a) K1: Annual scholarship of ₹1,000 for unmarried girls aged 13-18 in class VIII-XII.
             b) K2: One-time grant of ₹25,000 for unmarried girls turning 18.
           - INCOME LIMIT: Family income <= ₹1,20,000 per annum (Waived for special needs/orphans).
           - CITATION: West Bengal Dept of WCD & SW, Kanyashree Guidelines.`
  },
  {
      name: "Gruha Lakshmi (Karnataka)",
      region: "Karnataka",
      description: "Financial assistance of ₹2,000 per month to the woman head of the family.",
      rules: `
           - GOAL: Financial empowerment of women heads of households.
           - BENEFIT: ₹2,000 monthly.
           - ELIGIBILITY:
             a) Woman listed as Head of Family in Ration Card (APL/BPL/Antyodaya).
           - EXCLUSIONS:
             * Woman or her husband is an Income Tax payer.
             * Woman or her husband is a GST payer.
           - CITATION: Karnataka Dept of Women & Child Development 2023.`
  },
  {
      name: "MGNREGA (Job Card)",
      region: "All India",
      description: "Legal guarantee for at least 100 days of employment in every financial year to adult members of any rural household.",
      rules: `
           - GOAL: Livelihood security in rural areas.
           - ELIGIBILITY:
             a) Must be a Citizen of India.
             b) Must be above 18 years of age at time of application.
             c) Must be part of a rural household.
             d) Must volunteer for unskilled labor.
           - CITATION: MGNREG Act 2005, Schedule I.`
  },
  {
      name: "Atal Pension Yojana",
      region: "All India",
      description: "A pension scheme for citizens of India, focused on the unorganized sector workers.",
      rules: `
           - GOAL: Social Security for unorganized sector.
           - ELIGIBILITY:
             a) Indian Citizen.
             b) Age: 18 to 40 years.
             c) Must have a savings bank account.
           - EXCLUSIONS:
             * Income Tax payers (effective from Oct 1, 2022).
           - CITATION: PFRDA Guidelines for APY.`
  },
  {
      name: "Sukanya Samriddhi Yojana",
      region: "All India",
      description: "A small deposit scheme for the girl child launched as a part of the 'Beti Bachao Beti Padhao' campaign.",
      rules: `
           - GOAL: Savings for girl child's education/marriage.
           - ELIGIBILITY:
             a) Account can be opened by parents/guardian.
             b) Girl child age must be below 10 years at time of opening.
             c) Only one account per girl child, max 2 accounts per family (exception for twins).
           - MIN DEPOSIT: ₹250 per financial year.
           - CITATION: Ministry of Finance Notification 2014.`
  },
  {
      name: "Pradhan Mantri Ujjwala Yojana 2.0",
      region: "All India",
      description: "Distribution of LPG connections to women belonging to Below Poverty Line (BPL) families.",
      rules: `
           - GOAL: Clean cooking fuel for rural poor.
           - ELIGIBILITY: Adult woman of BPL family or eligible categories (SC/ST, PMAY, Antyodaya).
           - CRITERIA:
             * Applicant must be 18+ years.
             * No other LPG connection in the same household.
           - CITATION: Ministry of Petroleum & Natural Gas Guidelines.`
  },
  {
      name: "Pradhan Mantri Jan Dhan Yojana",
      region: "All India",
      description: "National Mission for Financial Inclusion to ensure access to financial services in an affordable manner.",
      rules: `
           - GOAL: Financial inclusion (Banking the unbanked).
           - ELIGIBILITY: Any citizen of India (10+ years age).
           - BENEFIT: Zero balance account, RuPay Debit Card, Accident Insurance cover of ₹2 Lakh.
           - CITATION: Department of Financial Services Guidelines.`
  },
  {
      name: "PM Jeevan Jyoti Bima Yojana",
      region: "All India",
      description: "A one-year life insurance scheme renewable from year to year offering coverage for death due to any reason.",
      rules: `
           - GOAL: Affordable Life Insurance.
           - ELIGIBILITY: Age 18-50 years, having a bank account.
           - PREMIUM: ₹436 per annum (auto-debited).
           - COVER: ₹2 Lakh on death due to any cause.
           - CITATION: DFS, Ministry of Finance.`
  },
  {
      name: "PM Suraksha Bima Yojana",
      region: "All India",
      description: "Accident Insurance Scheme offering accidental death and disability cover.",
      rules: `
           - GOAL: Accident Insurance.
           - ELIGIBILITY: Age 18-70 years, having a bank account.
           - PREMIUM: ₹20 per annum.
           - COVER: ₹2 Lakh for accidental death/full disability, ₹1 Lakh for partial disability.
           - CITATION: DFS, Ministry of Finance.`
  },
  {
      name: "Stand Up India Scheme",
      region: "All India",
      description: "Facilitate bank loans between 10 lakh and 1 Crore to at least one SC or ST borrower and at least one woman borrower per bank branch.",
      rules: `
           - GOAL: Entrepreneurship among SC/ST and Women.
           - ELIGIBILITY: 
             * SC/ST and/or Woman entrepreneur (above 18 years).
             * Greenfield project (first time venture).
             * Manufacturing, Services, Agri-allied, or Trading.
           - CITATION: SIDBI Stand Up India Guidelines.`
  },
  {
      name: "PM Vishwakarma Yojana",
      region: "All India",
      description: "Support for artisans and craftspeople who work with their hands and tools.",
      rules: `
           - GOAL: Upliftment of traditional artisans (Vishwakarmas).
           - TRADES: 18 traditional trades (Carpenter, Blacksmith, Potter, etc.).
           - BENEFIT: 
             * Recognition (ID Card).
             * Skill training + Stipend.
             * Collateral-free credit support up to ₹3 Lakh (in tranches).
           - CITATION: Ministry of MSME Guidelines 2023.`
  },
  {
      name: "SVAMITVA Yojana",
      region: "All India",
      description: "Survey of Villages and Mapping with Improvised Technology in Village Areas to provide property cards.",
      rules: `
           - GOAL: Property ownership rights in rural areas.
           - ELIGIBILITY: Rural households in inhabited areas (Abadi) of villages.
           - BENEFIT: 'Sanad' or Property Card used as financial asset.
           - CITATION: Ministry of Panchayati Raj.`
  },
  {
      name: "PM SVANidhi",
      region: "All India",
      description: "Micro-credit facility for street vendors to restart their livelihoods post-COVID.",
      rules: `
           - GOAL: Working capital loan for Street Vendors.
           - ELIGIBILITY: Street vendors vending in urban areas as on or before March 24, 2020.
           - LOAN: 
             * 1st Tranche: ₹10k.
             * 2nd Tranche: ₹20k (on repayment).
             * 3rd Tranche: ₹50k.
           - CITATION: Ministry of Housing & Urban Affairs.`
  },
  {
      name: "Pradhan Mantri Matsya Sampada Yojana",
      region: "All India",
      description: "Scheme to bring about Blue Revolution through sustainable and responsible development of fisheries sector.",
      rules: `
           - GOAL: Double fishers' income and fish production.
           - ELIGIBILITY: Fishers, fish farmers, SHGs, JLGs, Cooperatives.
           - BENEFIT: Financial assistance for boats, nets, ponds, cold chain (Central/State share varies).
           - CITATION: Department of Fisheries Guidelines.`
  },
  {
      name: "National Social Assistance Programme (Old Age)",
      region: "All India",
      description: "IGNOAPS: Pension for elderly BPL citizens.",
      rules: `
           - GOAL: Social security for elderly.
           - ELIGIBILITY: 
             * Age 60 years or higher.
             * Belonging to household below poverty line (BPL).
           - BENEFIT: Monthly pension (Central contribution ₹200-500 + State contribution).
           - CITATION: Ministry of Rural Development, NSAP Guidelines.`
  },
  {
      name: "National Social Assistance Programme (Widow)",
      region: "All India",
      description: "IGNWPS: Pension for BPL widows.",
      rules: `
           - GOAL: Social security for widows.
           - ELIGIBILITY: 
             * Age 40-79 years.
             * Widow belonging to BPL household.
           - BENEFIT: Monthly pension.
           - CITATION: Ministry of Rural Development, NSAP Guidelines.`
  },
  {
      name: "National Social Assistance Programme (Disability)",
      region: "All India",
      description: "IGNDPS: Pension for persons with severe and multiple disabilities.",
      rules: `
           - GOAL: Support for disabled BPL individuals.
           - ELIGIBILITY: 
             * Age 18-79 years.
             * 80% or more disability.
             * BPL household.
           - CITATION: Ministry of Rural Development, NSAP Guidelines.`
  },
  {
      name: "Mission Indradhanush",
      region: "All India",
      description: "Health mission to ensure full immunization of children and pregnant women.",
      rules: `
           - GOAL: 90%+ Full Immunization Coverage.
           - TARGET: 
             * Children 0-2 years (unvaccinated or partially vaccinated).
             * Pregnant women.
           - VACCINES: TB, Polio, Hep B, DPT, Measles, Rubella, Rotavirus, etc.
           - CITATION: Ministry of Health & Family Welfare.`
  },
  {
      name: "Poshan Abhiyaan",
      region: "All India",
      description: "National Nutrition Mission to reduce stunting, under-nutrition, anemia, and low birth weight.",
      rules: `
           - GOAL: Malnutrition free India.
           - BENEFICIARIES: Children (0-6 years), Pregnant Women, Lactating Mothers, Adolescent Girls.
           - COMPONENT: Technology driven monitoring (Poshan Tracker), Convergence.
           - CITATION: Ministry of Women & Child Development.`
  },
  {
      name: "FAME India Phase II",
      region: "All India",
      description: "Faster Adoption and Manufacturing of Hybrid and Electric Vehicles.",
      rules: `
           - GOAL: Promote Electric Vehicles (EVs).
           - BENEFIT: Upfront demand incentive on purchase of EVs.
           - ELIGIBILITY: 
             * Public Transport/Commercial use (3W/4W).
             * Private use (2W).
             * Vehicle must be registered as EV.
           - CITATION: Ministry of Heavy Industries.`
  },
  {
      name: "e-Shram Card",
      region: "All India",
      description: "National Database of Unorganized Workers.",
      rules: `
           - GOAL: Database for social security of unorganized workers.
           - ELIGIBILITY: 
             * Age 16-59 years.
             * Unorganized worker (construction, migrant, gig, etc.).
             * NOT an EPFO/ESIC member.
             * NOT an Income Tax Payer.
           - CITATION: Ministry of Labour & Employment.`
  },
  {
      name: "Amrut 2.0",
      region: "All India",
      description: "Atal Mission for Rejuvenation and Urban Transformation 2.0.",
      rules: `
           - GOAL: Water secure cities.
           - FOCUS: Universal coverage of water supply in all statutory towns.
           - CITATION: Ministry of Housing & Urban Affairs.`
  },
  {
      name: "Smart Cities Mission",
      region: "All India",
      description: "Urban renewal and retrofitting program to develop smart cities.",
      rules: `
           - GOAL: Sustainable and inclusive cities.
           - SELECTION: 100 cities selected via Challenge mode.
           - CITATION: Ministry of Housing & Urban Affairs.`
  },
  {
      name: "Ujala Scheme",
      region: "All India",
      description: "Unnat Jyoti by Affordable LEDs for All.",
      rules: `
           - GOAL: Energy efficiency.
           - BENEFIT: LED bulbs at subsidized rates.
           - ELIGIBILITY: Domestic households having metered connection.
           - CITATION: EESL, Ministry of Power.`
  },
  {
      name: "PM Gati Shakti",
      region: "All India",
      description: "National Master Plan for Multi-modal Connectivity.",
      rules: `
           - GOAL: Integrated planning and coordinated implementation of infrastructure connectivity projects.
           - SECTORS: Roads, Railways, Airports, Ports, Mass Transport, Waterways, Logistics.
           - CITATION: DPIIT, Ministry of Commerce.`
  },
  {
      name: "Rashtriya Gokul Mission",
      region: "All India",
      description: "Development and conservation of indigenous bovine breeds.",
      rules: `
           - GOAL: Enhance milk production and productivity.
           - COMPONENTS: Artificial Insemination, Sex Sorted Semen, IVF technology.
           - CITATION: Department of Animal Husbandry & Dairying.`
  },
  {
      name: "Solar Charkha Mission",
      region: "All India",
      description: "Employment generation for rural people using solar-powered charkhas.",
      rules: `
           - GOAL: Green energy + Employment in textile.
           - TARGET: 50 clusters across India.
           - BENEFICIARIES: Spinners, Weavers, Artisans.
           - CITATION: Ministry of MSME.`
  },
  {
      name: "Samarth Scheme",
      region: "All India",
      description: "Scheme for Capacity Building in Textile Sector.",
      rules: `
           - GOAL: Skilling youth in textile sector.
           - ELIGIBILITY: Indian Citizens.
           - FOCUS: Organized and Traditional sectors (excluding Spinning and Weaving).
           - CITATION: Ministry of Textiles.`
  },
  {
      name: "Nai Manzil Scheme",
      region: "All India",
      description: "Integrated Education and Livelihood Initiative for Minority Communities.",
      rules: `
           - GOAL: Education + Skill training for minorities.
           - ELIGIBILITY: 
             * Minority community dropouts (Class 8 or 10 fail/dropout).
             * Age 17-35 years.
             * BPL family preferred.
           - CITATION: Ministry of Minority Affairs.`
  },
  {
      name: "Seekho aur Kamao",
      region: "All India",
      description: "Skill development scheme for youth of 14 - 35 years age group and aiming at improving the employability of existing workers, school dropouts etc.",
      rules: `
           - GOAL: Skill development for minorities.
           - ELIGIBILITY: Minority youth (14-35 years).
           - CITATION: Ministry of Minority Affairs.`
  },
  {
      name: "Beti Bachao Beti Padhao",
      region: "All India",
      description: "Campaign to generate awareness and improve the efficiency of welfare services intended for girls.",
      rules: `
           - GOAL: Prevent gender biased sex selective elimination.
           - FOCUS: CSR (Child Sex Ratio) improvement, Girl Child Education.
           - CITATION: Tri-ministerial (WCD, HFW, HRD).`
  },
  {
      name: "One Stop Centre Scheme (Sakhi)",
      region: "All India",
      description: "Support to women affected by violence, in private and public spaces, within the family, community and at the workplace.",
      rules: `
           - GOAL: Integrated support (Medical, Legal, Psychological, Shelter) under one roof.
           - BENEFICIARY: Any woman facing violence.
           - CITATION: Ministry of Women & Child Development.`
  },
  {
      name: "Rastriya Vayoshri Yojana",
      region: "All India",
      description: "Scheme for providing Physical Aids and Assisted-living Devices for Senior citizens belonging to BPL category.",
      rules: `
           - GOAL: Assisted living for elderly.
           - ELIGIBILITY: Senior Citizens (60+), BPL category, suffering from age related disability/infirmity.
           - BENEFIT: Free distribution of aids (Walking sticks, Hearing aids, Spectacles, etc.).
           - CITATION: Ministry of Social Justice & Empowerment.`
  },
  {
      name: "ADIP Scheme",
      region: "All India",
      description: "Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances.",
      rules: `
           - GOAL: Assist needy disabled persons.
           - ELIGIBILITY: 
             * 40% or more disability.
             * Monthly income up to ₹20,000.
           - CITATION: Ministry of Social Justice & Empowerment.`
  },
  {
      name: "Deendayal Antyodaya Yojana - NRLM",
      region: "All India",
      description: "National Rural Livelihoods Mission to alleviate rural poverty via SHGs.",
      rules: `
           - GOAL: Mobilize rural poor women into Self Help Groups (SHGs).
           - BENEFIT: Revolving Fund, Community Investment Fund, Interest Subvention.
           - TARGET: 1 woman from every rural poor household.
           - CITATION: Ministry of Rural Development.`
  },
  {
      name: "Deendayal Antyodaya Yojana - NULM",
      region: "All India",
      description: "National Urban Livelihoods Mission to reduce poverty and vulnerability of urban poor.",
      rules: `
           - GOAL: Skill training, Self Employment, Support for Urban Street Vendors, Shelters for Urban Homeless.
           - ELIGIBILITY: Urban Poor.
           - CITATION: Ministry of Housing & Urban Affairs.`
  },
  {
      name: "PM Kaushal Vikas Yojana 4.0",
      region: "All India",
      description: "Flagship scheme for skill training of youth.",
      rules: `
           - GOAL: Skill certification and placement.
           - COMPONENTS: Short Term Training, RPL (Recognition of Prior Learning).
           - FOCUS 4.0: New age courses (AI, Robotics, 3D Printing, Drone).
           - CITATION: Ministry of Skill Development & Entrepreneurship.`
  },
  {
      name: "Khelo India",
      region: "All India",
      description: "National Programme for Development of Sports.",
      rules: `
           - GOAL: Mainstream sports as tool for national development.
           - SCHOLARSHIP: ₹5 Lakh/annum for 8 years to talented players selected in Khelo India Games.
           - CITATION: Ministry of Youth Affairs & Sports.`
  },
  {
      name: "PM SHRI Schools",
      region: "All India",
      description: "Pradhan Mantri Schools for Rising India - Upgradation of existing schools to model schools.",
      rules: `
           - GOAL: Showcase implementation of NEP 2020.
           - TARGET: 14,500+ schools.
           - CITATION: Ministry of Education.`
  },
  {
      name: "Mid-Day Meal (PM Poshan)",
      region: "All India",
      description: "Hot cooked meal to school children.",
      rules: `
           - GOAL: Nutritional support + School attendance.
           - ELIGIBILITY: Children in Govt/Govt-aided schools (Class I-VIII).
           - CITATION: Ministry of Education.`
  },
  {
      name: "Kalaignar Magalir Urimai Thogai (Tamil Nadu)",
      region: "Tamil Nadu",
      description: "Monthly financial assistance scheme for women heads of households.",
      rules: `
           - GOAL: Women empowerment.
           - BENEFIT: ₹1,000 per month.
           - ELIGIBILITY: 
             * Woman head of family.
             * Annual Family Income < ₹2.5 Lakh.
             * Owning < 5 acres wetland / 10 acres dryland.
             * Electricity consumption < 3600 units/year.
           - CITATION: TN Govt Special Programme Implementation Dept.`
  },
  {
      name: "Jagananna Vidya Deevena (Andhra Pradesh)",
      region: "Andhra Pradesh",
      description: "Full fee reimbursement scheme for students pursuing higher education.",
      rules: `
           - GOAL: Higher education access.
           - BENEFIT: Full fee reimbursement credited to Mother's account.
           - ELIGIBILITY: 
             * Family income < ₹2.5 Lakh.
             * Students in ITI, Polytechnic, Degree, Engineering, Medicine etc.
           - CITATION: AP Social Welfare Dept.`
  },
  {
      name: "Aasara Pension (Telangana)",
      region: "Telangana",
      description: "Social safety net for old, infirm, disabled and widows.",
      rules: `
           - GOAL: Social security.
           - AGE: 57+ years for Old Age Pension.
           - ELIGIBILITY: BPL families.
           - CITATION: Telangana Panchayat Raj & Rural Development Dept.`
  },
  {
      name: "Dalit Bandhu (Telangana)",
      region: "Telangana",
      description: "Direct cash transfer scheme for Dalit empowerment.",
      rules: `
           - GOAL: Economic upliftment of SC families.
           - BENEFIT: One-time grant of ₹10 Lakh per family (No bank linkage required).
           - ELIGIBILITY: SC families in Telangana.
           - CITATION: Telangana SC Development Dept.`
  },
  {
      name: "YSR Rythu Bharosa (Andhra Pradesh)",
      region: "Andhra Pradesh",
      description: "Input subsidy for farmers.",
      rules: `
           - GOAL: Farm investment support.
           - BENEFIT: ₹13,500 per year (Including PM-KISAN ₹6k).
           - ELIGIBILITY: Land owning farmers and SC/ST/BC/Minority tenant farmers.
           - CITATION: AP Agriculture Dept.`
  },
  {
      name: "Mo Ghara Yojana (Odisha)",
      region: "Odisha",
      description: "Credit linked housing scheme for rural poor.",
      rules: `
           - GOAL: Rural Housing.
           - LOAN: Up to ₹3 Lakh.
           - SUBSIDY: Capital subsidy up to ₹60,000 (higher for SC/ST).
           - ELIGIBILITY: Family income < ₹25,000 per month.
           - CITATION: Odisha Panchayati Raj Dept.`
  },
  {
      name: "Biju Swasthya Kalyan Yojana (Odisha)",
      region: "Odisha",
      description: "Universal health coverage scheme.",
      rules: `
           - GOAL: Free treatment in Govt hospitals + Coverage in Pvt hospitals for Card holders.
           - COVER: ₹5 Lakh per family (₹10 Lakh for women members).
           - ELIGIBILITY: BSKY Smart Health Card holders (NFSA/SFSS families).
           - CITATION: Odisha Health & Family Welfare Dept.`
  },
  {
      name: "Lakhpati Didi",
      region: "All India",
      description: "Scheme to empower women in Self Help Groups (SHGs) to earn an annual income of at least ₹1 Lakh.",
      rules: `
           - GOAL: Economic prosperity for rural women.
           - FOCUS: Skill training (Drone, LED making, Plumbing etc.) + Market Linkage.
           - CITATION: Ministry of Rural Development.`
  },
  {
      name: "Namo Drone Didi",
      region: "All India",
      description: "Providing drones to Women SHGs for rental services to farmers for agriculture purposes.",
      rules: `
           - GOAL: Modernize agriculture + Women income.
           - BENEFIT: 80% subsidy on Drone cost (up to ₹8 Lakh).
           - ELIGIBILITY: Selected Women SHGs.
           - CITATION: Ministry of Agriculture & Farmers Welfare.`
  },
  {
      name: "Sovereign Gold Bond Scheme",
      region: "All India",
      description: "Government securities denominated in grams of gold.",
      rules: `
           - GOAL: Alternative to physical gold.
           - ELIGIBILITY: Resident Individuals, HUFs, Trusts.
           - LIMIT: Min 1 gm, Max 4 kg for individuals per fiscal year.
           - INTEREST: 2.50% per annum.
           - CITATION: RBI Notifications.`
  },
  {
      name: "Senior Citizen Savings Scheme",
      region: "All India",
      description: "Government-backed retirement benefits programme.",
      rules: `
           - GOAL: Secure income for seniors.
           - ELIGIBILITY: 60+ years (55+ for retirees on superannuation).
           - MAX DEPOSIT: ₹30 Lakh.
           - INTEREST: Quarterly payment (currently ~8.2%).
           - CITATION: Ministry of Finance.`
  },
  {
      name: "Public Provident Fund (PPF)",
      region: "All India",
      description: "Long term savings scheme with tax benefits.",
      rules: `
           - GOAL: Retirement savings + Tax saving (80C).
           - ELIGIBILITY: Resident Individuals.
           - LOCK-IN: 15 years.
           - MAX DEPOSIT: ₹1.5 Lakh per year.
           - CITATION: Public Provident Fund Scheme 2019.`
  },
  {
      name: "National Pension System (NPS)",
      region: "All India",
      description: "Voluntary, long-term retirement savings scheme.",
      rules: `
           - GOAL: Old age income security.
           - ELIGIBILITY: Citizens 18-70 years.
           - TYPES: Tier I (Pension - Locked), Tier II (Investment - Liquid).
           - CITATION: PFRDA.`
  },
  {
      name: "Varishtha Pension Bima Yojana",
      region: "All India",
      description: "Pension scheme for senior citizens implemented by LIC.",
      rules: `
           - GOAL: Assured pension based on guaranteed return.
           - ELIGIBILITY: 60 years and above.
           - LOCK-IN: 15 years.
           - CITATION: LIC of India.`
  }
];

export const SCHEME_OPTIONS = [
  "Pradhan Mantri Awas Yojana (Urban)",
  "PM-KISAN Samman Nidhi",
  "Post-Matric Scholarship for SC Students",
  "Ayushman Bharat - PMJAY",
  "Mudra Yojana (Business Loan)",
  "Ladli Behna Yojana (Madhya Pradesh)",
  "Kalia Scheme (Odisha)",
  "Rythu Bandhu (Telangana)",
  "Kanyashree Prakalpa (West Bengal)",
  "Gruha Lakshmi (Karnataka)",
  "MGNREGA (Job Card)",
  "Atal Pension Yojana",
  "Sukanya Samriddhi Yojana",
  "Pradhan Mantri Ujjwala Yojana 2.0",
  "Pradhan Mantri Jan Dhan Yojana",
  "PM Jeevan Jyoti Bima Yojana",
  "PM Suraksha Bima Yojana",
  "Stand Up India Scheme",
  "PM Vishwakarma Yojana",
  "SVAMITVA Yojana",
  "PM SVANidhi",
  "Pradhan Mantri Matsya Sampada Yojana",
  "National Social Assistance Programme (Old Age)",
  "National Social Assistance Programme (Widow)",
  "National Social Assistance Programme (Disability)",
  "Mission Indradhanush",
  "Poshan Abhiyaan",
  "FAME India Phase II",
  "e-Shram Card",
  "Amrut 2.0",
  "Smart Cities Mission",
  "Ujala Scheme",
  "PM Gati Shakti",
  "Rashtriya Gokul Mission",
  "Solar Charkha Mission",
  "Samarth Scheme",
  "Nai Manzil Scheme",
  "Seekho aur Kamao",
  "Beti Bachao Beti Padhao",
  "One Stop Centre Scheme (Sakhi)",
  "Rastriya Vayoshri Yojana",
  "ADIP Scheme",
  "Deendayal Antyodaya Yojana - NRLM",
  "Deendayal Antyodaya Yojana - NULM",
  "PM Kaushal Vikas Yojana 4.0",
  "Khelo India",
  "PM SHRI Schools",
  "Mid-Day Meal (PM Poshan)",
  "Kalaignar Magalir Urimai Thogai (Tamil Nadu)",
  "Jagananna Vidya Deevena (Andhra Pradesh)",
  "Aasara Pension (Telangana)",
  "Dalit Bandhu (Telangana)",
  "YSR Rythu Bharosa (Andhra Pradesh)",
  "Mo Ghara Yojana (Odisha)",
  "Biju Swasthya Kalyan Yojana (Odisha)",
  "Lakhpati Didi",
  "Namo Drone Didi",
  "Sovereign Gold Bond Scheme",
  "Senior Citizen Savings Scheme",
  "Public Provident Fund (PPF)",
  "National Pension System (NPS)",
  "Varishtha Pension Bima Yojana"
].sort();