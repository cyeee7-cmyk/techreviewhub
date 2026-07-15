'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { Profile, Bookmark, Subscriber } from '@/lib/supabase/types';
import { User as UserIcon, Mail, Bookmark as BookmarkIcon, Bell, LogOut, Save, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  user: User;
  profile: Profile | null;
  bookmarks: Bookmark[];
  subscription: Subscriber | null;
}

export default function AccountClient({ user, profile, bookmarks, subscription }: Props) {
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'bookmarks' | 'subscription'>('profile');
  const router = useRouter();

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage('');
    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    if (error) {
      setMessage('Failed to save: ' + error.message);
    } else {
      setMessage('Profile saved!');
    }
    setSaving(false);
  };

  const handleRemoveBookmark = async (slug: string, type: string) => {
    const supabase = createClient();
    await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('article_slug', slug)
      .eq('article_type', type);
    router.refresh();
  };

  const handleToggleSubscription = async () => {
    const supabase = createClient();
    if (subscription) {
      await supabase
        .from('subscribers')
        .update({ is_active: !subscription.is_active })
        .eq('id', subscription.id);
    } else {
      await supabase.from('subscribers').insert({
        email: user.email,
        user_id: user.id,
        is_active: true,
        source: 'account',
      });
    }
    router.refresh();
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const avatarUrl = user.user_metadata?.avatar_url;
  const initial = (profile?.display_name || user.email || 'U').charAt(0).toUpperCase();

  const articlePathMap: Record<string, string> = {
    review: '/reviews',
    comparison: '/comparisons',
    buying_guide: '/best',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{initial}</span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {profile?.display_name || user.email?.split('@')[0]}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {[
          { key: 'profile' as const, label: 'Profile', icon: UserIcon },
          { key: 'bookmarks' as const, label: `Bookmarks (${bookmarks.length})`, icon: BookmarkIcon },
          { key: 'subscription' as const, label: 'Newsletter', icon: Bell },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === key
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Edit Profile</h2>
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes('Failed')
                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
            }`}>
              {message}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'bookmarks' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Bookmarks</h2>
          {bookmarks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <BookmarkIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No bookmarks yet. Browse articles and save your favorites!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {bookmark.article_type}
                    </span>
                    <Link
                      href={`${articlePathMap[bookmark.article_type] || '/reviews'}/${bookmark.article_slug}`}
                      className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                    >
                      {bookmark.article_slug.replace(/-/g, ' ')} <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                  <button
                    onClick={() => handleRemoveBookmark(bookmark.article_slug, bookmark.article_type)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'subscription' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Newsletter Subscription</h2>
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {subscription?.is_active ? '✅ Subscribed' : '⬜ Not subscribed'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get the latest reviews &amp; deals delivered to your inbox
              </p>
            </div>
            <button
              onClick={handleToggleSubscription}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                subscription?.is_active
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {subscription?.is_active ? 'Unsubscribe' : 'Subscribe'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
