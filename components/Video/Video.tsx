import Image from "next/image";
import Link from "next/link";

interface IVideoProps {
  videoInfo: TYtbOembedResponse;
  sharingUser?: TUserResponse;
}

function Video({ videoInfo, sharingUser }: IVideoProps) {
  return (
    <div className="flex justify-center items-start w-full gap-x-4">
      <Image
        width={videoInfo.thumbnail_width}
        height={videoInfo.thumbnail_height}
        alt="Video Thumbnail"
        src={videoInfo.thumbnail_url}
        className="w-1/2 aspect-video border-2 border-black custom-shadow object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="line-clamp-2 text-xl font-semibold mb-2">
          {videoInfo.title}
        </h3>
        <p>
          <span className="font-semibold">Author name</span>:{" "}
          <Link
            href={videoInfo.author_url}
            target="_blank"
            className="hover:underline"
          >
            {videoInfo.author_name}
          </Link>
        </p>
        <p>
          <span className="font-semibold">Type</span>: {videoInfo.type}
        </p>
        <p>
          <span className="font-semibold">Version</span>: {videoInfo.version}
        </p>
        <p className="text-sm text-neutral-500">
          Shared by: {sharingUser?.email}
        </p>
      </div>
    </div>
  );
}

export default Video;
