
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const TranslatorAlert = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="text-red-600 font-semibold">
          Service Disruption
        </AlertTitle>
        <AlertDescription className="text-red-600/90">
          Our translation service is currently experiencing some technical difficulties. 
          We are working to resolve these issues as quickly as possible. Thank you for your patience.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TranslatorAlert;
