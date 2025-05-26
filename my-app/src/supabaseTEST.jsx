import React, { useEffect } from "react";
import { supabase } from "../supabaseClient";

const TestSupabase = () => {
  useEffect(() => {
    async function fetchMuseums() {
      const { data, error } = await supabase
        .from('Museos')
        .select('*');
      if (error) {
        console.error(error);
      } else {
        console.log("Museos:", data);
      }
    }
    fetchMuseums();
  }, []);

  return <div>Check the console for Supabase data!</div>;
};

export default TestSupabase;
