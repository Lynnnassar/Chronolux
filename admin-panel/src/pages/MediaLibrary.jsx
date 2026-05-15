import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Search,
  Filter,
  HardDrive,
} from "lucide-react";
import config from "../config";

const MediaLibrary = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFolder, setFilterFolder] = useState("all");

  const { data: media, isLoading } = useQuery({
    queryKey: ["media-library"],
    queryFn: async () => {
      const response = await axios.get(`${config.API_BASE_URL}/media`);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (url) => {
      await axios.post(`${config.API_BASE_URL}/media/delete`, { url });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["media-library"]);
    },
  });

  const filteredMedia = media?.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFolder =
      filterFolder === "all" || item.folder === filterFolder;
    return matchesSearch && matchesFolder;
  });

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const folders = ["all", "watches", "brands", "categories", "hero", "misc"];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Media Library
          </h2>
          <p className="text-slate-500 text-sm">
            Manage all uploaded assets across the platform.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search filenames..."
            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-slate-400" />
          <select
            className="bg-slate-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer capitalize"
            value={filterFolder}
            onChange={(e) => setFilterFolder(e.target.value)}
          >
            {folders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={i}
              className="aspect-square bg-slate-100 animate-pulse rounded-2xl"
            ></div>
          ))}
        </div>
      ) : filteredMedia?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.url}
              className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              <div className="aspect-square bg-slate-50 relative overflow-hidden">
                <img
                  src={`${config.IMAGE_BASE_URL}${item.url}`}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <a
                    href={`${config.IMAGE_BASE_URL}${item.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this file?",
                        )
                      ) {
                        deleteMutation.mutate(item.url);
                      }
                    }}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3 space-y-1">
                <p
                  className="text-[10px] font-bold text-slate-900 truncate"
                  title={item.name}
                >
                  {item.name}
                </p>
                <div className="flex justify-between items-center text-[8px] text-slate-400 uppercase tracking-widest font-bold">
                  <span className="flex items-center">
                    <HardDrive size={8} className="mr-1" />{" "}
                    {formatSize(item.size)}
                  </span>
                  <span className="bg-slate-100 px-1 rounded">
                    {item.folder}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-slate-200">
            <ImageIcon size={40} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">No media found</h3>
            <p className="text-slate-500 text-sm">
              Try adjusting your filters or search terms.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
