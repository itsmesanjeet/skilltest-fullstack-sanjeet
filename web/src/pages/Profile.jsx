import React from 'react';

const Profile = () => {
  const profile = {
    name: 'Assault Master',
    email: 'assault@example.com',
    mobile: '+91 9876543210',
    designation: 'Frontend Developer',
    role: 'Manager',
    location: 'Mumbai, India',
    photo: '', // Replace with a real photo URL if available
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-10 text-neonBlue drop-shadow-neon">
        Profile
      </h2>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-10">
        {/* Photo */}
        <div className="w-50 h-40 rounded-full bg-neonBlue/20 border-2 border-neonBlue flex items-center justify-center text-4xl font-semibold text-neonBlue overflow-hidden">
          {profile.photo ? (
            <img src={profile.photo} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            profile.name[0]
          )}
        </div>

        {/* Details */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="text-neonBlue font-semibold">{profile.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-gray-200">{profile.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Mobile</p>
            <p className="text-gray-200">{profile.mobile}</p>
          </div>
          <div>
            <p className="text-gray-400">Designation</p>
            <p className="text-gray-200">{profile.designation}</p>
          </div>
          <div>
            <p className="text-gray-400">Role</p>
            <p className="text-gray-200">{profile.role}</p>
          </div>
          <div>
            <p className="text-gray-400">Location</p>
            <p className="text-gray-200">{profile.location}</p>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="text-right">
        <button className="bg-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-slate-600 transition cursor-pointer">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
