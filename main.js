window.addEventListener('DOMContentLoaded', () => {
  const supabase = window.supabase.createClient(
    'https://oiwqlyyxnpozsjfkofjx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pd3FseXl4bnBvenNqZmtvZmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMjk2NTUsImV4cCI6MjA3NjYwNTY1NX0.GqozfTSNCHzTlr_eWswquuggWFBEm5FhnKpuPwubC0w'
  );

  window.addPoints = async function(username, amount) {
    const { data, error } = await supabase
      .from('users')
      .update({ points: supabase.raw('points + ' + amount) })
      .eq('username', username);

    if (error) {
      console.error('Error updating points:', error);
    } else {
      console.log('Points updated:', data);
    }
  };
});
