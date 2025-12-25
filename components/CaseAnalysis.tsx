import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle, Loader2, ArrowRight, Building2, User, Wallet, Users, MapPin, FileQuestion, Search, ChevronDown, Check, X, Lightbulb } from 'lucide-react';
import Button from './Button';
import { GoogleGenAI, Type } from "@google/genai";
import { POLICY_DATABASE, SCHEME_OPTIONS, INDIAN_STATES } from '../data/policies';

interface AnalysisResult {
  status: 'Eligible' | 'Not Eligible' | 'Needs Review';
  reason: string;
  criteriaBreakdown: {
    name: string;
    met: boolean;
    explanation: string;
  }[];
  summary: string;
  policyReference: {
    name: string;
    section: string;
    date: string;
  };
  relatedSchemes?: {
    name: string;
    eligibilityProbability: 'High' | 'Medium' | 'Low';
    reason: string;
  }[];
}

const CaseAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  const [isSchemeDropdownOpen, setIsSchemeDropdownOpen] = useState(false);
  const [schemeSearchTerm, setSchemeSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    officerName: '',
    department: 'Social Welfare',
    scheme: 'Pradhan Mantri Awas Yojana (Urban)',
    age: '',
    income: '',
    category: 'General',
    location: '',
    type: 'New',
    question: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const userLocation = formData.location.toLowerCase();
      
      // Filter policies: Include All India + Matching State + The specifically selected scheme (if any)
      const relevantPolicies = POLICY_DATABASE.filter(p => {
        const isNational = p.region === "All India";
        const isRegionMatch = p.region !== "All India" && userLocation.includes(p.region.toLowerCase());
        // Simple fuzzy match for selected scheme to ensure its rules are present even if location is wrong
        // This allows the AI to say "Not Eligible: Location mismatch" instead of "Unknown Policy"
        const isSelectedScheme = formData.scheme.toLowerCase().includes(p.name.toLowerCase());
        
        return isNational || isRegionMatch || isSelectedScheme;
      });

      const policyContextText = relevantPolicies.map((p, i) => 
        `${i + 1}. SCHEME: ${p.name} [Region: ${p.region}]\n${p.rules}`
      ).join('\n\n');

      const systemContext = `
        You are PolicyPulse, a strict policy eligibility engine for Indian Government Services.
        You have access to the following Internal Policy Database (treat input currency as INR ₹).
        
        The database has been pre-filtered based on the user's location ("${formData.location}").
        
        ${policyContextText}

        Task: Analyze the input case against these rules. 
        - If the user asks a specific question (e.g., "Can a doctor apply for PM-KISAN?"), answer that specifically based on the exclusion criteria.
        - If the scheme name doesn't match perfectly, infer the closest one from the provided list.
        - Be extremely strict about Income Limits and Categories.
        - Break down the analysis into specific criteria (e.g., Age, Income, Category, Domicile/Location) and state if each is met.
        - IMPORTANT: Check Domicile/Location criteria strictly. If a scheme is for a specific state (e.g. Madhya Pradesh) and the applicant location does not match, they are Not Eligible.
        
        ADDITIONALLY:
        - Review the *other* policies in the provided database context.
        - Identify 1 to 3 OTHER schemes (excluding the one currently being analyzed) that this applicant is likely eligible for based on their Age, Income, Category, and Location.
        - If no other schemes are relevant, return an empty list for related schemes.
        
        Return the result in JSON format only.
      `;

      const prompt = `
        Analyze this case:
        Scheme: ${formData.scheme}
        Applicant Age: ${formData.age}
        Annual Income: ${formData.income}
        Category: ${formData.category}
        Location: ${formData.location}
        Application Type: ${formData.type}
        Specific Question: ${formData.question || "Is the applicant eligible based on the provided details?"}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            systemInstruction: systemContext,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    status: { type: Type.STRING, enum: ["Eligible", "Not Eligible", "Needs Review"] },
                    reason: { type: Type.STRING, description: "A high-level summary of why the status was chosen." },
                    criteriaBreakdown: {
                        type: Type.ARRAY,
                        description: "A list of specific criteria checked and their individual status.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Name of the criterion (e.g., Income Limit)" },
                                met: { type: Type.BOOLEAN, description: "True if this specific criterion is met" },
                                explanation: { type: Type.STRING, description: "Short explanation (e.g., Income ₹2.5L is within ₹3L limit)" }
                            }
                        }
                    },
                    summary: { type: Type.STRING },
                    policyReference: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            section: { type: Type.STRING },
                            date: { type: Type.STRING }
                        }
                    },
                    relatedSchemes: {
                        type: Type.ARRAY,
                        description: "List of other schemes from the database that the applicant might be eligible for based on their profile.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                eligibilityProbability: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                                reason: { type: Type.STRING }
                            }
                        }
                    }
                }
            }
        }
      });

      const text = response.text;
      if (text) {
        setResult(JSON.parse(text));
      }
    } catch (error) {
      console.error("Analysis failed", error);
      // Fallback for demo if API fails or key missing
      setResult({
        status: "Needs Review",
        reason: "System was unable to verify remote policy database. Please check connection.",
        criteriaBreakdown: [],
        summary: "Automatic analysis unavailable.",
        policyReference: { name: "System Error", section: "N/A", date: new Date().toISOString() }
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = SCHEME_OPTIONS.filter(scheme => 
    scheme.toLowerCase().includes(schemeSearchTerm.toLowerCase())
  );

  const selectedSchemeData = POLICY_DATABASE.find(p => p.name === formData.scheme);

  const switchToScheme = (schemeName: string) => {
    setFormData(prev => ({ ...prev, scheme: schemeName }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gov-50 min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gov-900">Case Analysis</h1>
          <p className="mt-2 text-gray-600">Enter applicant details to retrieve relevant government policies and eligibility guidance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gov-900 flex items-center">
                   <FileText className="w-5 h-5 mr-2 text-blue-600" />
                   Case Details
                </h2>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  ID: #{Math.floor(Math.random() * 10000)}
                </div>
              </div>

              <form onSubmit={handleAnalyze} className="space-y-5">
                
                {/* Officer Info (Optional) */}
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Officer Name</label>
                    <div className="flex items-center text-sm text-gov-900">
                        <User className="w-3 h-3 mr-1.5 text-gray-400" />
                        <input 
                            type="text" 
                            name="officerName"
                            placeholder="Officer Name"
                            value={formData.officerName}
                            onChange={handleInputChange}
                            className="bg-transparent border-none p-0 focus:ring-0 w-full text-sm placeholder-gray-400"
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
                    <select 
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="bg-transparent border-none p-0 focus:ring-0 w-full text-sm font-medium text-gov-900"
                    >
                      <option>Social Welfare</option>
                      <option>Housing (MoHUA)</option>
                      <option>Agriculture</option>
                      <option>Health (NHA)</option>
                    </select>
                  </div>
                </div>

                {/* Main Form Fields */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gov-900 mb-1">Scheme / Service</label>
                  
                  {/* Invisible Overlay for click-outside */}
                  {isSchemeDropdownOpen && (
                    <div className="fixed inset-0 z-10" onClick={() => setIsSchemeDropdownOpen(false)}></div>
                  )}

                  <div className="relative z-20">
                    <div 
                        className="relative cursor-pointer"
                        onClick={() => setIsSchemeDropdownOpen(!isSchemeDropdownOpen)}
                    >
                        <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <div className="pl-9 pr-8 w-full rounded-md border border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 text-sm h-10 flex items-center bg-white">
                            <span className="block truncate">{formData.scheme || "Select Scheme"}</span>
                        </div>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </span>
                    </div>

                    {isSchemeDropdownOpen && (
                        <div className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            <div className="sticky top-0 z-10 bg-white px-2 py-1 border-b border-gray-100">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
                                    <input
                                        type="text"
                                        className="w-full pl-7 pr-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                                        placeholder="Search schemes..."
                                        value={schemeSearchTerm}
                                        onChange={(e) => setSchemeSearchTerm(e.target.value)}
                                        autoFocus
                                        onClick={(e) => e.stopPropagation()} 
                                    />
                                </div>
                            </div>
                            {filteredSchemes.length > 0 ? (
                                filteredSchemes.map((scheme) => (
                                    <div
                                        key={scheme}
                                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${formData.scheme === scheme ? 'text-blue-900 bg-blue-50 font-medium' : 'text-gray-900'}`}
                                        onClick={() => {
                                            setFormData({...formData, scheme: scheme});
                                            setIsSchemeDropdownOpen(false);
                                            setSchemeSearchTerm("");
                                        }}
                                    >
                                        <span className="block truncate">{scheme}</span>
                                        {formData.scheme === scheme && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                                <Check className="h-4 w-4" />
                                            </span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="py-2 px-3 text-gray-500 text-xs text-center">No schemes found</div>
                            )}
                        </div>
                    )}
                  </div>
                  
                  {/* Scheme Description Display */}
                  {selectedSchemeData && (
                    <div className="mt-2 text-xs text-gray-500 bg-blue-50/50 p-2 rounded border border-blue-50 leading-relaxed">
                        {selectedSchemeData.description}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gov-900 mb-1">Applicant Age</label>
                    <input
                      type="number"
                      name="age"
                      required
                      placeholder="e.g. 45"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gov-900 mb-1">Annual Income (₹)</label>
                    <div className="relative">
                        <Wallet className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                        type="number"
                        name="income"
                        required
                        placeholder="e.g. 250000"
                        value={formData.income}
                        onChange={handleInputChange}
                        className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                        />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gov-900 mb-1">Category</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                        >
                        <option>General</option>
                        <option>OBC</option>
                        <option>SC</option>
                        <option>ST</option>
                        <option>EWS</option>
                        </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gov-900 mb-1">Application Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                    >
                      <option>New</option>
                      <option>Renewal</option>
                      <option>Appeal</option>
                    </select>
                  </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gov-900 mb-1">Location (State/UT)</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <select
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleInputChange}
                            className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                        >
                            <option value="">Select State/UT</option>
                            {INDIAN_STATES.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gov-900 mb-1">
                    Specific Question <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FileQuestion className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        name="question"
                        placeholder="e.g. Is income tax payer eligible?"
                        value={formData.question}
                        onChange={handleInputChange}
                        className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full flex justify-center items-center shadow-md shadow-blue-900/10"
                    disabled={loading}
                  >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing Policies...
                        </>
                    ) : (
                        <>
                            Analyze Case
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                  </Button>
                </div>

              </form>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            {loading ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center animate-pulse">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                        <ShieldCheck className="w-8 h-8 text-blue-600 animate-bounce" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Scanning Policy Database...</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-xs">Comparing case details against active Indian government schemes and regulations.</p>
                </div>
            ) : result ? (
                <div className="space-y-6">
                    {/* Status Card */}
                    <div className={`bg-white rounded-xl shadow-md border-l-4 overflow-hidden ${
                        result.status === 'Eligible' ? 'border-l-green-500' : 
                        result.status === 'Not Eligible' ? 'border-l-red-500' : 'border-l-yellow-500'
                    }`}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Eligibility Assessment</h3>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                                     result.status === 'Eligible' ? 'bg-green-100 text-green-800' : 
                                     result.status === 'Not Eligible' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {result.status === 'Eligible' ? <CheckCircle2 className="w-4 h-4 mr-1.5"/> : <AlertCircle className="w-4 h-4 mr-1.5"/>}
                                    {result.status}
                                </span>
                            </div>
                            
                            {/* High Level Reason */}
                            <div className="mb-6">
                                <p className="text-gray-900 font-medium text-lg leading-relaxed">{result.reason}</p>
                            </div>

                            {/* Detailed Criteria Breakdown */}
                            {result.criteriaBreakdown && result.criteriaBreakdown.length > 0 && (
                                <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Criteria Breakdown</h4>
                                    <div className="space-y-3">
                                        {result.criteriaBreakdown.map((criteria, idx) => (
                                            <div key={idx} className="flex items-start">
                                                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${criteria.met ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {criteria.met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                                </div>
                                                <div className="ml-3">
                                                    <p className={`text-sm font-medium ${criteria.met ? 'text-gray-900' : 'text-red-700'}`}>
                                                        {criteria.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{criteria.explanation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Summary */}
                            <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Policy Summary</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {result.summary}
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500">
                                <span className="font-semibold mr-1">Source:</span> {result.policyReference.name}
                            </div>
                            <div className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                                View Original Document &rarr;
                            </div>
                        </div>
                    </div>

                    {/* Citations Detail */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Official Citation</h4>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                                    §
                                </div>
                            </div>
                            <div>
                                <h5 className="text-base font-medium text-gov-900">{result.policyReference.name}</h5>
                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                    <span>Clause: {result.policyReference.section}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span>Last Amended: {result.policyReference.date}</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 italic">
                                    "The automated retrieval system has matched the applicant's profile against the cited section above."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related Schemes Section */}
                    {result.relatedSchemes && result.relatedSchemes.length > 0 && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center mb-4">
                                <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Related Schemes for You</h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {result.relatedSchemes.map((scheme, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                                        onClick={() => switchToScheme(scheme.name)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                                scheme.eligibilityProbability === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {scheme.eligibilityProbability} Match
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <h5 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{scheme.name}</h5>
                                        <p className="text-xs text-gray-500 line-clamp-3">{scheme.reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Ready to Analyze</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-sm">
                        Fill in the case details on the left and click "Analyze Case" to retrieve policy guidance.
                    </p>
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CaseAnalysis;