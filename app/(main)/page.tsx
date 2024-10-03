"use client";
import Video from "@/components/Video";
import {
  PAGE_LIMIT,
  useCountTotalLinks,
  useListLinks,
} from "@/services/link/services";
import Link from "next/link";

function Home() {
  const { data, isLoading, fetchNextPage } = useListLinks();
  const { data: total } = useCountTotalLinks();

  if (isLoading) {
    return (
      <div className="w-full flex-center flex-col  gap-y-3 mt-4">
        <span className="loader-md size-6" />
        <div className="w-2/3 text-sm text-center p-2 rounded bg-neutral-200 text-neutral-500">
          The server is deployed on Render and will spin down with inactivity,
          which can delay requests by 50 seconds or more.
        </div>
      </div>
    );
  }

  const links = data?.pages.flatMap((page) => page) || [];
  const currentPage = links.length / PAGE_LIMIT || 1;
  const totalLinks = total || 0;

  return (
    <main className="mt-4 w-2/3">
      <div className="flex flex-col items-center gap-y-2 mb-8">
        {links.map((link) => {
          return (
            <Link
              key={link.id}
              href={link.url}
              className="w-full transition-effect hover:bg-gray-100 p-3 rounded-lg"
              target="_blank"
            >
              <Video videoInfo={link} sharingUser={link.user} />
            </Link>
          );
        })}
        {links.length < totalLinks && (
          <button
            className="border-2 border-black custom-shadow button-md"
            onClick={() => {
              fetchNextPage({
                pageParam: currentPage + 1,
              });
            }}
          >
            more
          </button>
        )}
      </div>
    </main>
  );
}

export default Home;
