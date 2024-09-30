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
  const { mutate, isLoading } = useLinkCreation();

  const handleError = (isError: boolean) => {
    setCanSubmit(!isError);
  };

  return (
    <div className="w-full flex-center">
      <div className="w-2/3 mt-[80px]">
        <h2 className="text-xl font-semibold">Share a Youtube video</h2>
        <div className="flex items-center justify-between mt-4">
          <input
            className="input-border w-3/4 rounded-md p-2"
            placeholder="input Youtube video URL"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />

          <button
            className="button-md border-2 border-black custom-shadow flex-center gap-x-2"
            onClick={() => {
              if (!canSubmit || url === "") {
                toast.error("Please input valid URL");
                return;
              }

              mutate(
                { url },
                {
                  onSuccess: () => {
                    setUrl("");
                    setCanSubmit(false);
                    toast.success("Submit successfully!");
                  },
                }
              );
            }}
          >
            Submit
            {isLoading && <span className="loader size-4" />}
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
