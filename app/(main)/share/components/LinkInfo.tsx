import Video from "@/components/Video";
import { useGetYtbOembed } from "@/services/link/services";
import { useEffect } from "react";

interface ILinkInfo {
  url: string;
  onError?: (isError: boolean) => void;
}
function LinkInfo({ url, onError }: ILinkInfo) {
  const { data, isError } = useGetYtbOembed(url);

  useEffect(() => {
    if (onError) {
      onError(isError);
    }
  }, [isError, onError]);

  if (!data) {
    return null;
  }

  return (
    <div className="mt-4">
      <Video videoInfo={data.data} />
    </div>
  );
}

export default LinkInfo;
