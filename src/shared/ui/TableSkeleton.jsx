import { Skeleton } from "@mui/material";

export const TableSkeleton = () => {
  return (
    <div style={{ width: "100%", padding: "16px" }}>
      {/* Table Skeleton */}
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: "grey.400" }} />
      
      {/* Table Row Skeletons */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "8px" }}>
          {/* Table Cell Skeletons */}
          <Skeleton variant="rectangular" width="20%" height={40} sx={{ bgcolor: "grey.500", marginRight: "8px" }} />
          <Skeleton variant="rectangular" width="30%" height={40} sx={{ bgcolor: "grey.500", marginRight: "8px" }} />
          <Skeleton variant="rectangular" width="20%" height={40} sx={{ bgcolor: "grey.500", marginRight: "8px" }} />
          <Skeleton variant="rectangular" width="20%" height={40} sx={{ bgcolor: "grey.500", marginRight: "8px" }} />
          <Skeleton variant="rectangular" width="10%" height={40} sx={{ bgcolor: "grey.500" }} />
        </div>
      ))}
    </div>
  );
};
