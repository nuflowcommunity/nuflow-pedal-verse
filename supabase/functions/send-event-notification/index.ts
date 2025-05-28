
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  eventId: string;
  templateType: 'approved' | 'rejected' | 'updated';
  recipientEmail: string;
  eventData: {
    title: string;
    rejection_reason?: string;
    admin_notes?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { eventId, templateType, recipientEmail, eventData }: NotificationRequest = await req.json();

    // Buscar template de notificação
    const { data: template, error: templateError } = await supabase
      .from('event_notification_templates')
      .select('*')
      .eq('template_type', templateType)
      .single();

    if (templateError || !template) {
      throw new Error(`Template não encontrado para o tipo: ${templateType}`);
    }

    // Substituir variáveis no template
    let subject = template.subject
      .replace('{{event_title}}', eventData.title);
    
    let bodyHtml = template.body_html
      .replace(/{{event_title}}/g, eventData.title)
      .replace(/{{rejection_reason}}/g, eventData.rejection_reason || '')
      .replace(/{{admin_notes}}/g, eventData.admin_notes || '');

    let bodyText = template.body_text
      .replace(/{{event_title}}/g, eventData.title)
      .replace(/{{rejection_reason}}/g, eventData.rejection_reason || '')
      .replace(/{{admin_notes}}/g, eventData.admin_notes || '');

    // Enviar email
    const emailResponse = await resend.emails.send({
      from: "Montanha Tech <noreply@montanhatech.com>",
      to: [recipientEmail],
      subject: subject,
      html: bodyHtml,
      text: bodyText,
    });

    console.log("Email sent successfully:", emailResponse);

    // Registrar notificação no banco
    await supabase
      .from('event_notifications')
      .insert({
        event_id: eventId,
        user_id: null, // Será preenchido pelo trigger se necessário
        notification_type: templateType,
        message: subject,
        is_read: false
      });

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-event-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
