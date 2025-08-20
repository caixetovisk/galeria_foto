import { createClient } from '@supabase/supabase-js';

const supabase = createClient('your_project_url', 'your_supabase_api_key')

interface Arquivo {
    path: string,
    file: string
}

const BUCKET = "galeria";
const PATH_IMAGE = 'arquivos';
const PATH_PROFILE = 'profile';

const sendFileToSupabase = async ({ file, path }: Arquivo): Promise<void> => {
    
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(PATH_PROFILE, file)
    if (error) {
        console.error(error.message);
    } else {
        console.log("Salvou!!!!")
    }
}

const removeFileFromSupabase = async ({ file, path }: Arquivo): Promise<void> => {
    
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .remove([`PATH_PROFILE/${path}`])
    if (error) {
        console.error(error.message);
    } else {
        console.log("Removeu!!!!!")
    }
}

const downloadFileFromSupabase = async ({ file, path }: Arquivo): Promise<void> => {
    
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .download(`PATH_PROFILE/${file}`)
    if (error) {
        console.error(error.message);
    } else {
        console.log("Removeu!!!!!")
    }
}