'use client';

import React, { useState } from 'react';
import {
  Linkedin,
  Mail,
  Twitter,
  Github,
  MessageCircle,
  Facebook,
  Gamepad2,
  Send,
  DollarSign,
  Briefcase,
  Globe,
  Wifi,
  Rocket,
  Save,
  Trash2,
  Check,
  ExternalLink,
  LucideIcon,
} from 'lucide-react';
import { useSocials } from '@/context/social-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: LucideIcon;
  color: string;
}

const socialPlatforms: Omit<SocialLink, 'id' | 'url'>[] = [
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    color: '#0A66C2',
  },
  {
    platform: 'gmail',
    label: 'Gmail',
    icon: Mail,
    color: '#EA4335',
  },
  {
    platform: 'x',
    label: 'X (Twitter)',
    icon: Twitter,
    color: '#000000',
  },
  {
    platform: 'github',
    label: 'GitHub',
    icon: Github,
    color: '#181717',
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    icon: MessageCircle,
    color: '#25D366',
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
  },
  {
    platform: 'discord',
    label: 'Discord',
    icon: Gamepad2,
    color: '#5865F2',
  },
  {
    platform: 'telegram',
    label: 'Telegram',
    icon: Send,
    color: '#26A5E4',
  },
  {
    platform: 'fiverr',
    label: 'Fiverr',
    icon: DollarSign,
    color: '#00B22D',
  },
  {
    platform: 'upwork',
    label: 'Upwork',
    icon: Briefcase,
    color: '#14A800',
  },
  {
    platform: 'cryptojobslist',
    label: 'CryptoJobsList',
    icon: Globe,
    color: '#6366F1',
  },
  {
    platform: 'web3career',
    label: 'web3.career',
    icon: Rocket,
    color: '#8B5CF6',
  },
  {
    platform: 'remote3',
    label: 'remote3.co',
    icon: Wifi,
    color: '#0EA5E9',
  },
  {
    platform: 'wellfound',
    label: 'Wellfound',
    icon: ExternalLink,
    color: '#FF5252',
  },
];

const placeholderUrls: Record<string, string> = {
  linkedin: 'https://linkedin.com/in/your-profile',
  gmail: 'mailto:your-email@gmail.com',
  x: 'https://x.com/your-handle',
  github: 'https://github.com/your-username',
  whatsapp: 'https://wa.me/your-number',
  facebook: 'https://facebook.com/your-profile',
  discord: 'https://discord.gg/your-invite',
  telegram: 'https://t.me/your-handle',
  fiverr: 'https://fiverr.com/your-profile',
  upwork: 'https://upwork.com/freelancers/your-profile',
  cryptojobslist: 'https://cryptojobslist.com/your-profile',
  web3career: 'https://web3.career/your-profile',
  remote3: 'https://remote3.co/your-profile',
  wellfound: 'https://wellfound.com/your-profile',
};

export function SocialLinks() {
  const { socials, setSocials, saveSocials } = useSocials();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateUrl = (platform: string, url: string) => {
    setSocials((prev) => {
      const exists = prev.find((s) => s.platform === platform);

      if (exists) {
        return prev.map((s) => (s.platform === platform ? { ...s, url } : s));
      }

      const info = socialPlatforms.find((p) => p.platform === platform);

      return [
        ...prev,
        {
          platform,
          label: info?.label || platform,
          url,
        },
      ];
    });
  };

  const links = socialPlatforms.map((platform) => {
    const existing = socials.find((s) => s.platform === platform.platform);

    return {
      ...platform,
      id: platform.platform,
      url: existing?.url || '',
    };
  });

  const removeLink = (platform: string) => {
    setSocials((prev) =>
      prev.map((social) => (social.platform === platform ? { ...social, url: '' } : social)),
    );
  };

  const handleSave = async () => {
    setSaving(true);

    await saveSocials();

    setSaving(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const activeLinks = links.filter((l) => l.url.trim());
  //  const inactiveLinks = links.filter((l) => !l.url.trim());

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Social Links</h2>

        <p className="text-muted-foreground mt-1">
          Manage your social profiles and platform links.
        </p>
      </div>

      {saved && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 text-sm font-medium flex items-center gap-2">
          <Check className="w-4 h-4" />
          Social links saved successfully!
        </div>
      )}

      {/* Active Links */}
      {activeLinks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Active Links
              <Badge variant="secondary" className="text-xs">
                {activeLinks.length}
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {activeLinks.map((link) => {
              const Icon = link.icon;

              return (
                <div
                  key={link.id}
                  className="flex items-center gap-4 p-3 rounded-lg border bg-card"
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                    style={{ backgroundColor: link.color + '15' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: link.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Label className="text-sm font-medium">{link.label}</Label>

                    <p className="text-xs text-muted-foreground truncate mt-0.5">{link.url}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLink(link.platform)}
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* All Links Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Platforms</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <div key={link.id} className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                  style={{ backgroundColor: link.color + '15' }}
                >
                  <Icon className="w-4 h-4" style={{ color: link.color }} />
                </div>

                <div className="flex-1 grid gap-2 sm:grid-cols-5">
                  <Label className="sm:col-span-1 flex items-center text-sm font-medium">
                    {link.label}
                  </Label>

                  <Input
                    placeholder={placeholderUrls[link.platform]}
                    value={link.url}
                    onChange={(e) => updateUrl(link.platform, e.target.value)}
                    className="sm:col-span-4"
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex items-center gap-4 pt-2">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[hsl(var(--admin-primary))] hover:bg-[hsl(var(--admin-primary))]/90 text-[hsl(var(--admin-primary-foreground))] px-8"
        >
          {saving ? (
            <>
              <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Links
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
