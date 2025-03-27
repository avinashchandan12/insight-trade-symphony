
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, Check, CreditCard, HelpCircle, KeyRound, LogOut, 
  Shield, User, Smartphone, Moon, Sun, Lock, Key
} from "lucide-react";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  
  return (
    <AppLayout>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and account settings</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-5">
            <h2 className="text-lg font-semibold mb-6">Settings Menu</h2>
            
            <div className="space-y-1">
              <SettingsNavItem
                icon={<User className="h-5 w-5" />}
                label="Account"
                active
              />
              <SettingsNavItem
                icon={<Bell className="h-5 w-5" />}
                label="Notifications"
              />
              <SettingsNavItem
                icon={<CreditCard className="h-5 w-5" />}
                label="Billing & Plans"
              />
              <SettingsNavItem
                icon={<KeyRound className="h-5 w-5" />}
                label="API Keys"
              />
              <SettingsNavItem
                icon={<Shield className="h-5 w-5" />}
                label="Security"
              />
              <SettingsNavItem
                icon={<HelpCircle className="h-5 w-5" />}
                label="Help & Support"
              />
              <div className="pt-4 mt-4 border-t border-border/40">
                <SettingsNavItem
                  icon={<LogOut className="h-5 w-5" />}
                  label="Logout"
                  variant="destructive"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/80 flex items-center justify-center text-xl font-semibold">
                    JD
                  </div>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-muted-foreground text-sm">john.doe@example.com</p>
                    <div className="flex items-center mt-1.5">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span className="text-xs text-muted-foreground">Pro Plan</span>
                    </div>
                  </div>
                  <div className="sm:ml-auto">
                    <Button variant="outline" size="sm" className="bg-secondary/40">
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div>
                  <h3 className="font-medium mb-4">Theme Preferences</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {darkMode ? (
                        <Moon className="h-5 w-5 mr-3 text-primary" />
                      ) : (
                        <Sun className="h-5 w-5 mr-3 text-primary" />
                      )}
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                      </div>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div>
                  <h3 className="font-medium mb-4">Connected Accounts</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-secondary/40 p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-secondary/80 flex items-center justify-center mr-3">
                          <span className="font-semibold text-xs">UP</span>
                        </div>
                        <div>
                          <p className="font-medium">Upstox</p>
                          <p className="text-xs text-muted-foreground">Connected on Sep 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center mr-2">
                          <Check className="h-3 w-3 mr-1" />
                          <span>Active</span>
                        </div>
                        <Button variant="outline" size="sm" className="bg-secondary/60">
                          Disconnect
                        </Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full bg-secondary/40">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect Another Trading Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive alerts and updates</p>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <div className="divider"></div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Notification Channels</h3>
                  
                  <div className="flex items-center justify-between pl-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                      <p>Email notifications</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pl-3">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-3 text-muted-foreground" />
                      <p>Push notifications</p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Notification Types</h3>
                  
                  <NotificationTypeItem
                    label="Price alerts"
                    description="Get notified when a stock reaches your target price"
                    enabled={true}
                    disabled={!notificationsEnabled}
                  />
                  
                  <NotificationTypeItem
                    label="Market updates"
                    description="Daily summaries and important market events"
                    enabled={true}
                    disabled={!notificationsEnabled}
                  />
                  
                  <NotificationTypeItem
                    label="AI insights"
                    description="New AI-generated analysis and recommendations"
                    enabled={true}
                    disabled={!notificationsEnabled}
                  />
                  
                  <NotificationTypeItem
                    label="Strategy opportunities"
                    description="Alerts when market conditions match your strategies"
                    enabled={true}
                    disabled={!notificationsEnabled}
                  />
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch
                    checked={twoFactor}
                    onCheckedChange={setTwoFactor}
                  />
                </div>
                
                <div className="divider"></div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Key className="h-5 w-5 mr-3 text-primary" />
                      <p className="font-medium">Password</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-secondary/40">
                      Change
                    </Button>
                  </div>
                  <div className="pl-8">
                    <p className="text-sm text-muted-foreground">Last changed: 45 days ago</p>
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div>
                  <h3 className="font-medium mb-3">Login History</h3>
                  <div className="space-y-3">
                    <LoginHistoryItem
                      device="Chrome on Windows"
                      location="Mumbai, India"
                      time="Just now"
                      current={true}
                    />
                    <LoginHistoryItem
                      device="Safari on iPhone"
                      location="Mumbai, India"
                      time="Yesterday, 3:45 PM"
                    />
                    <LoginHistoryItem
                      device="Chrome on Mac"
                      location="Delhi, India"
                      time="Oct 12, 2023, 10:30 AM"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const SettingsNavItem = ({ 
  icon, 
  label, 
  active = false,
  variant = "default"
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  variant?: "default" | "destructive";
}) => {
  return (
    <div className={cn(
      "flex items-center px-3 py-2.5 rounded-lg transition-colors cursor-pointer",
      active ? "bg-primary/20 text-primary" : 
      variant === "destructive" ? "text-destructive hover:bg-destructive/10" : 
      "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
    )}>
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
};

const NotificationTypeItem = ({ 
  label, 
  description, 
  enabled, 
  disabled 
}: { 
  label: string; 
  description: string; 
  enabled: boolean; 
  disabled: boolean; 
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className={cn("font-medium", disabled && "text-muted-foreground")}>{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={isEnabled}
        onCheckedChange={setIsEnabled}
        disabled={disabled}
      />
    </div>
  );
};

const LoginHistoryItem = ({ 
  device, 
  location, 
  time, 
  current = false 
}: { 
  device: string; 
  location: string; 
  time: string; 
  current?: boolean; 
}) => {
  return (
    <div className="flex items-start">
      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
      <div>
        <div className="flex items-center">
          <p className="font-medium">{device}</p>
          {current && (
            <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-primary/20 text-primary">
              Current
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{location} • {time}</p>
      </div>
    </div>
  );
};

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default Settings;
