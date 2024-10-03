import Image from "next/image";

interface IVideoProps {
  videoInfo: TYtbOembedResponse;
  sharingUser?: TUserResponse;
}

function Video({ videoInfo, sharingUser }: IVideoProps) {
  return (
    <div className="flex flex-col min-[440px]:flex-row justify-center items-start w-full gap-x-4">
      <Image
        width={videoInfo.thumbnail_width}
        height={videoInfo.thumbnail_height}
        alt="Video Thumbnail"
        src={videoInfo.thumbnail_url}
        priority
        className="w-full mb-2 min-[440px]:mb-0 min-[440px]:w-1/2 aspect-video border-2 border-black custom-shadow object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="line-clamp-2 text-sm min-[440px]:text-base sm:text-xl font-semibold mb-1 sm:mb-2">
          {videoInfo.title}
        </h3>
        <p className="text-sm sm:text-base line-clamp-1 min-[440px]:block hidden">
          <span className="font-semibold">Author name</span>:{" "}
          {videoInfo.author_name}
        </p>
        <p className="text-sm sm:text-base min-[440px]:block hidden">
          <span className="font-semibold">Type</span>: {videoInfo.type}
        </p>
        {sharingUser !== undefined && (
          <p className="text-neutral-500 text-xs sm:text-sm">
            Shared by: {sharingUser?.email}
          </p>
        )}
      </div>
    </div>
  );
}

export default Video;
