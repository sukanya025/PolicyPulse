import React, { useState } from 'react';
import { Search, Loader2, ArrowRight, User, Wallet, Users, MapPin, Building, Sparkles, AlertCircle } from 'lucide-react';
import Button from './Button';
import { GoogleGenAI, Type } from "@google/genai";
import { POLICY_DATABASE, INDIAN_STATES } from '../data/policies';

interface EligibleScheme {
  name: string;
  category: string;
  matchReason: string;
  confidence: 'High' | 'Medium';
  benefits: string;
}

const SchemeFinder: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [eligibleSchemes, setEligibleSchemes] = useState<EligibleScheme[] | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
    department: '',
    location: '',
    category: 'General'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEligibleSchemes(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const userLocation = formData.location.toLowerCase();
      
      // Filter DB slightly to help context window, but keep most for discovery
      const relevantPolicies = POLICY_DATABASE.filter(p => {
        const isNational = p.region === "All India";
        const isRegionMatch = p.region !== "All India" && userLocation.includes(p.region.toLowerCase());
        return isNational || isRegionMatch;
      });

      const policyContextText = relevantPolicies.map((p, i) => 
        `${i + 1}. SCHEME: ${p.name} [Region: ${p.region}]\n${p.rules}`
      ).join('\n\n');

      const systemContext = `
        You are a government welfare expert. 
        I will provide a user profile and a database of government schemes.
        Your task is to identify ALL schemes for which the user is ELIGIBLE.
        
        Strictly follow these rules:
        1. Check Age limits.
        2. Check Income limits (User income is ${formData.income}).
        3. Check Category (User is ${formData.category}).
        4. Check Location (User is in ${formData.location}). If a scheme is for a specific state that doesn't match the user, DO NOT include it.
        5. If the user specified a department, prioritize schemes from that department but include others if highly relevant.
        
        Database:
        ${policyContextText}
      `;

      const prompt = `
        User Profile:
        Name: ${formData.name}
        Age: ${formData.age}
        Annual Family Income: ${formData.income}
        Location: ${formData.location}
        Category: ${formData.category}
        Preferred Department: ${formData.department || "Any"}

        Find all eligible schemes.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: systemContext,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                matchReason: { type: Type.STRING, description: "Why is the user eligible?" },
                confidence: { type: Type.STRING, enum: ["High", "Medium"] },
                benefits: { type: Type.STRING, description: "Short summary of benefits" }
              }
            }
          }
        }
      });

      const text = response.text;
      if (text) {
        setEligibleSchemes(JSON.parse(text));
      }
    } catch (error) {
      console.error("Discovery failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gov-50 min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gov-900">Scheme Finder</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about yourself or the applicant, and our AI will scan the entire policy database to find every scheme you are eligible for.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gov-900 mb-6 flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-600" />
                Applicant Profile
              </h2>
              
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                    placeholder="e.g. 45"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Family Income (₹)</label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      name="income"
                      required
                      className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                      placeholder="e.g. 150000"
                      value={formData.income}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location (State/UT)</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department Interest <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-gov-500 focus:ring-gov-500 sm:text-sm h-10 border px-3"
                    >
                      <option value="">Any Department</option>
                      <option>Agriculture</option>
                      <option>Education</option>
                      <option>Health</option>
                      <option>Housing</option>
                      <option>Social Welfare</option>
                      <option>Women & Child Development</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full flex justify-center items-center py-2.5"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Finding Schemes...
                      </>
                    ) : (
                      <>
                        Find Eligible Schemes
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2">
            {loading ? (
               <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-200 border-dashed animate-pulse">
                  <Sparkles className="w-12 h-12 text-blue-400 mb-4 animate-spin-slow" />
                  <h3 className="text-xl font-medium text-gray-900">Matching Profile...</h3>
                  <p className="text-gray-500 mt-2 text-center max-w-sm">Checking {formData.age} years old, ₹{formData.income} income, and {formData.location} domicile against database rules.</p>
               </div>
            ) : eligibleSchemes ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    Found {eligibleSchemes.length} Eligible Schemes
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Profile: {formData.name}
                  </span>
                </div>

                {eligibleSchemes.length === 0 ? (
                   <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
                      <AlertCircle className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-yellow-800">No matching schemes found</h3>
                      <p className="text-yellow-600 mt-2">Try adjusting the income or category filters, or check if the location is supported.</p>
                   </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {eligibleSchemes.map((scheme, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -mr-4 -mt-4"></div>
                        
                        <div className="relative">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-1 rounded">
                              {scheme.category || "General Welfare"}
                            </span>
                            {scheme.confidence === 'High' && (
                              <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded flex items-center">
                                <Sparkles className="w-3 h-3 mr-1" />
                                High Match
                              </span>
                            )}
                          </div>
                          
                          <h4 className="text-xl font-bold text-gov-900 mb-2">{scheme.name}</h4>
                          
                          <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
                            <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Why Eligible:</span> {scheme.matchReason}</p>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">{scheme.benefits}</p>
                          
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                            View Details <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-200 border-dashed p-10 text-center">
                <Search className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Start your search</h3>
                <p className="text-gray-500 mt-2 max-w-sm">
                  Fill in the details on the left to see which government schemes you qualify for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeFinder;