import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins Could not Be Loaded");
  }
  return data;
}

export async function createEditCabin(newCabine, id) {
  const hasImagePath = newCabine.image?.startsWith?.(supabaseUrl);

  // Unique Cabin Name NO "/" because it will make new path
  const imageName = `${Math.random()}-${newCabine.image.name}`.replaceAll(
    `/`,
    ""
  );

  const imagePath = hasImagePath
    ? newCabine.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://nokrrzwaewtkuofeagdq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // 1.Create/edit Cabin
  let query = supabase.from("cabins");
  //  A) CREATE
  if (!id)
    query = query
      .insert([{ ...newCabine, image: imagePath }])
      .select()
      .single();

  //  B) EDIT
  if (id) query = query.update({ ...newCabine, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins Could not Be Created");
  }
  // 2. Upload Image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabine.image);
  // 3. Delete The cabin If there was an error uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin Image Could Not Be Uploaded And the cabin was not created"
    );
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins Could not Be Deleted");
  }
  return data;
}
