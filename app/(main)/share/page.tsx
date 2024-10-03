"use client";

import { useState } from "react";
import LinkInfo from "./components/LinkInfo";
import useDebounce from "@/hooks/useDebounce";
import toast from "react-hot-toast";
import { useLinkCreation } from "@/services/link/services";

function Share() {
  const [url, setUrl] = useState("");
  const debouncedUrl = useDebounce(url, 500);
  const [canSubmit, setCanSubmit] = useState(false);
  const { mutate } = useLinkCreation();

  const handleError = (isError: boolean) => {
    setCanSubmit(!isError);
  };

  return (
    <div className="w-full flex-center">
      <div className="md:w-2/3 sm:w-3/4 w-full mt-[40px] md:mt-[80px]">
        <h2 className="text-lg sm:text-xl font-semibold">
          Share a Youtube video
        </h2>
        <div className="flex items-center justify-between mt-2 sm:mt-4 custom-text">
          <input
            className="input-border w-3/4 rounded-md p-2"
            placeholder="input Youtube video URL"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />

          <button
            className="button md:px-4 border-2 border-black custom-shadow flex-center gap-x-2"
            onClick={() => {
              if (!canSubmit || url === "") {
                toast.error(
                  <span className="custom-text">Please input valid URL</span>
                );
                return;
              }

              mutate(
                { url },
                {
                  onSuccess: () => {
                    setUrl("");
                    setCanSubmit(false);
                    toast.success(
                      <span className="custom-text">Submit successfully!</span>
                    );
                  },
                }
              );
            }}
          >
            Submit
          </button>
        </div>
        {debouncedUrl !== "" && (
          <LinkInfo url={debouncedUrl} onError={handleError} />
        )}
      </div>
    </div>
  );
}

export default Share;
