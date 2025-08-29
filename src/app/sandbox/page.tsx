import { db } from "~/server/db";
import { files_table,folders_table } from "~/server/db/schema";
import { mockFiles, mockFolders } from "~/lib/mock-data"

export default function SandBoxPage() {
    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold">Sandbox</h1>
            <p className="mt-2">This is a sandbox page.</p>
            <form action={async () => {
                "use server";
                console.log("Form submitted");
                const fileInsert = await db.insert(files_table).values(mockFiles.map((file,index) => ({
                    id: index+1,
                    name: file.name,
                    size: 5000,
                    url: file.url,
                    parent: (index % 3) + 1,
                })))

                const folderInsert = await db.insert(folders_table).values(mockFolders.map((folder,index) => ({
                    id: index+1,
                    name: folder.name,
                    parent: index !== 0 ? 1 : null,
                })))

                console.log("Inserted files:", fileInsert)
                console.log("Inserted folders:", folderInsert)
            }}
            >
                <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">Submit</button>
            </form>
        </div>
    );
}