import { useEffect } from "react";

function DocumentTitle({ pageTitle }) {
  useEffect(() => {
    document.title = `SHOPWATCH - ${pageTitle}`;
  }, [pageTitle]);

  return (
    <>
     
    </>
  );
}

export default DocumentTitle
