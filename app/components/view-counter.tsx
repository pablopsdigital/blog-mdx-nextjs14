"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const supabase = createClientComponentClient();

type ViewCounterProps = {
  slug: string;
  noCount?: boolean;
  showCount?: boolean;
};

export function ViewCounter({
  slug,
  noCount = false,
  showCount = true,
}: ViewCounterProps) {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const fetchViews = async () => {
      if (!noCount) {
        const { data, error } = await supabase
          .from("views")
          .select("count")
          .eq("slug", slug)
          .single();

        if (error) {
          console.error("Error fetching views:", error.message);
        } else {
          setViews(data ? data.count : 0);
        }
      }
    };

    fetchViews();
  }, [slug, noCount]);

  if (showCount) {
    return <div>{views} views</div>;
  } else {
    return null;
  }
}
