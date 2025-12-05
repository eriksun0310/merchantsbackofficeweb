'use client';

import { Header } from '@/components/layout/header';
import { SettingsForm } from '@/components/settings/settings-form';

export default function SettingsPage() {
  return (
    <>
      <Header title="帳號設定" description="管理您的帳號資訊與聯絡方式" />

      <div className="p-6">
        <SettingsForm />
      </div>
    </>
  );
}
