NEXT: L10

https://egghead.io/lessons/supabase-create-a-table-in-supabase

https://typeofnan.dev/you-probably-shouldnt-ignore-react-hooks-exhaustive-deps-warnings/

Magic Link Authentication and Route Controls with Supabase and Next.js - The Complete Guide [2021]
https://youtu.be/oXWImFqsQF4

https://github.com/supabase-community/supabase-auth-helpers/tree/next/examples/nextjs

```
const getNotes = async () => {
    	const { data } = await supabase.from("notes").select("*");
    	  setNotes(data);
};

const { data: lesson } = await supabase
        .from("notes")
        .select("*")
        .eq("id", 1)
        .single();
      console.log("lesson", lesson);
};

// Supabase Functions
begin
  insert into public.profile(id)
  values(new.id);

  return new;
end;
```
