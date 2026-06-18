'use client'

import { useState } from 'react'

interface NotificationPreferences {
  stakingConfirmation: boolean
  withdrawalNotification: boolean
  gasSponsorshipUpdates: boolean
  weeklyReport: boolean
  securityAlerts: boolean
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    stakingConfirmation: true,
    withdrawalNotification: true,
    gasSponsorshipUpdates: true,
    weeklyReport: true,
    securityAlerts: true,
  })

  const [saved, setSaved] = useState(false)

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    setSaved(false)
  }

  const handleSave = async () => {
    try {
      // Save to database via API
      const response = await fetch('/api/user/notification-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Failed to save preferences:', error)
    }
  }

  const settings = [
    { key: 'stakingConfirmation', label: 'Staking Confirmations', description: 'Notify when staking transactions complete' },
    { key: 'withdrawalNotification', label: 'Withdrawal Notifications', description: 'Notify when withdrawals are processed' },
    { key: 'gasSponsorshipUpdates', label: 'Gas Sponsorship Updates', description: 'Notify when gas sponsorship is approved/denied' },
    { key: 'weeklyReport', label: 'Weekly Reports', description: 'Receive weekly staking analytics and performance reports' },
    { key: 'securityAlerts', label: 'Security Alerts', description: 'Critical security notifications and login alerts' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Email Notification Preferences</h3>

      <div className="space-y-3">
        {settings.map((setting) => (
          <div key={setting.key} className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border">
            <div>
              <p className="font-medium">{setting.label}</p>
              <p className="text-sm text-muted-foreground">{setting.description}</p>
            </div>
            <input
              type="checkbox"
              checked={preferences[setting.key as keyof NotificationPreferences]}
              onChange={() => handleToggle(setting.key as keyof NotificationPreferences)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Save Preferences
        </button>
        {saved && <span className="text-green-500 text-sm py-2">Preferences saved successfully!</span>}
      </div>
    </div>
  )
}
