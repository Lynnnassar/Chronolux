import { Shield, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-serif font-bold text-slate-900">
          Settings
        </h2>
        <p className="text-slate-500 text-sm">
          Configure your administrative preferences and platform defaults.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-50 pb-4">
            <Shield className="text-slate-400" size={20} />
            <h3 className="font-bold text-slate-900">
              Security & Authentication
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-slate-400">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 opacity-50">
          <div className="flex items-center space-x-3 border-b border-slate-50 pb-4">
            <Database className="text-slate-400" size={20} />
            <h3 className="font-bold text-slate-900">System Configuration</h3>
          </div>
          <p className="text-sm text-slate-500 italic">
            Advanced system settings are currently managed via config files.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Settings;
