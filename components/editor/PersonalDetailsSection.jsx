'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonal } from '@/store/cvSlice';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Upload,
  User,
  ChevronDown,
  ChevronUp,
  Trash2,
  Calendar,
  Flag,
  Car,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';

export default function PersonalDetailsSection() {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.cv.personal) || {};
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const handleChange = (field, value) => {
    dispatch(updatePersonal({ [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        handleChange('photo', uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    handleChange('photo', null);
  };

  return (
    <div className="space-y-4 text-black">
      {/* Recruiter Tip Banner */}
      <div className="p-3 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-start gap-2.5">
        <div className="p-1.5 rounded-lg bg-[#ffd905] border border-black shrink-0">
          <User className="w-4 h-4 text-black" />
        </div>
        <div className="text-xs">
          <span className="font-bold font-mono-tech block uppercase text-[11px] text-black">
            Recruiter Insight
          </span>
          <p className="text-slate-700 leading-snug">
            Users who added phone number, city, and a clear job title received 64% more positive feedback from hiring teams.
          </p>
        </div>
      </div>

      {/* Row 1: Job Target + Photo Upload */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1">
          <label className="block font-mono-tech text-xs font-bold text-black uppercase">
            Job Target / Desired Title
          </label>
          <input
            type="text"
            value={personal.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Senior AI Engineer / Product Designer"
            className="w-full px-3 py-2.5 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000] transition-colors"
          />
        </div>

        {/* Photo Upload Box */}
        <div className="space-y-1">
          <label className="block font-mono-tech text-xs font-bold text-black uppercase">
            Photo (Optional)
          </label>
          <div className="relative flex items-center gap-2 p-1.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
            {personal.photo ? (
              <div className="flex items-center gap-2 w-full">
                <img
                  src={personal.photo}
                  alt="Profile"
                  className="w-9 h-9 rounded-lg object-cover border border-black"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-[10px] font-mono-tech font-bold text-[#ff0522] hover:underline flex items-center gap-0.5"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-1.5 w-full py-1.5 cursor-pointer text-xs font-mono-tech font-bold text-black hover:bg-[#ffd905] rounded-lg transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span className="text-[11px]">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block font-mono-tech text-xs font-bold text-black uppercase">
            First Name <span className="text-[#ff0522]">*</span>
          </label>
          <input
            type="text"
            value={personal.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Alexandra"
            className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000] transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="block font-mono-tech text-xs font-bold text-black uppercase">
            Last Name <span className="text-[#ff0522]">*</span>
          </label>
          <input
            type="text"
            value={personal.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Chen"
            className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000] transition-colors"
          />
        </div>
      </div>

      {/* Row 3: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
            <Mail className="w-3 h-3 text-slate-700" /> Email <span className="text-[#ff0522]">*</span>
          </label>
          <input
            type="email"
            value={personal.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="alexandra.chen@email.com"
            className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000] transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
            <Phone className="w-3 h-3 text-slate-700" /> Phone
          </label>
          <input
            type="text"
            value={personal.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 012-3456"
            className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000] transition-colors"
          />
        </div>
      </div>

      {/* Row 4: LinkedIn URL & Postal Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
            <LinkedinIcon className="w-3 h-3 text-slate-700" /> LinkedIn URL
          </label>
          <input
            type="text"
            value={personal.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/alexandrachen"
            className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000] transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="block font-mono-tech text-xs font-bold text-black uppercase">
            Postal Code / ZIP
          </label>
          <input
            type="text"
            value={personal.postalCode || ''}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder="94107"
            className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000] transition-colors"
          />
        </div>
      </div>

      {/* Row 5: City, State & Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
            <MapPin className="w-3 h-3 text-slate-700" /> City, State
          </label>
          <input
            type="text"
            value={personal.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000] transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="block font-mono-tech text-xs font-bold text-black uppercase">
            Country <span className="text-[10px] text-slate-500 font-normal lowercase">(for global roles)</span>
          </label>
          <input
            type="text"
            value={personal.country || ''}
            onChange={(e) => handleChange('country', e.target.value)}
            placeholder="United States"
            className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000] transition-colors"
          />
        </div>
      </div>

      {/* Expandable Extra Details Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowMoreDetails(!showMoreDetails)}
          className="flex items-center gap-1.5 text-xs font-mono-tech font-bold text-black hover:text-[#ff64d5] transition-colors cursor-pointer"
        >
          {showMoreDetails ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          <span>{showMoreDetails ? 'Hide additional details' : '+ Add more details (Portfolio, GitHub, Nationality, etc.)'}</span>
        </button>

        {showMoreDetails && (
          <div className="mt-3 p-3.5 rounded-xl bg-white border-2 border-black space-y-3 shadow-[2px_2px_0px_#000] animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
                  <Globe className="w-3 h-3 text-slate-700" /> Website / Portfolio
                </label>
                <input
                  type="text"
                  value={personal.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="alexandrachen.design"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
                  <GithubIcon className="w-3 h-3 text-slate-700" /> GitHub URL
                </label>
                <input
                  type="text"
                  value={personal.github || ''}
                  onChange={(e) => handleChange('github', e.target.value)}
                  placeholder="github.com/alexchen"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
                  <Calendar className="w-3 h-3 text-slate-700" /> Date of Birth
                </label>
                <input
                  type="text"
                  value={personal.dob || ''}
                  onChange={(e) => handleChange('dob', e.target.value)}
                  placeholder="DD / MM / YYYY"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
                  <Flag className="w-3 h-3 text-slate-700" /> Nationality
                </label>
                <input
                  type="text"
                  value={personal.nationality || ''}
                  onChange={(e) => handleChange('nationality', e.target.value)}
                  placeholder="American"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
                  <Car className="w-3 h-3 text-slate-700" /> Driving License
                </label>
                <input
                  type="text"
                  value={personal.drivingLicense || ''}
                  onChange={(e) => handleChange('drivingLicense', e.target.value)}
                  placeholder="Class C"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
