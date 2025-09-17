'use client';

import React, { useMemo } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import ImprovedCardPreview from '@/app/archive/ImprovedCardPreview';

interface VirtualizedArchiveProps {
  projects: any[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const VirtualizedArchive: React.FC<VirtualizedArchiveProps> = ({
  projects,
  isLoading,
  hasMore,
  loadMore
}) => {
  // Calculate grid dimensions
  const columnCount = 3; // 3 columns on desktop
  const rowCount = Math.ceil(projects.length / columnCount);
  const itemHeight = 400; // Height of each project card
  const itemWidth = 350; // Width of each project card

  // Memoize the item renderer
  const ItemRenderer = useMemo(() => {
    return ({ columnIndex, rowIndex, style }: any) => {
      const index = rowIndex * columnCount + columnIndex;
      const project = projects[index];

      if (!project) {
        return <div style={style} />;
      }

      return (
        <div style={style}>
          <div className="p-2">
            <ImprovedCardPreview project={project} index={index} />
          </div>
        </div>
      );
    };
  }, [projects, columnCount]);

  return (
    <div className="w-full">
      <Grid
        columnCount={columnCount}
        columnWidth={itemWidth}
        height={600} // Fixed height for the viewport
        rowCount={rowCount}
        rowHeight={itemHeight}
        width="100%"
        itemData={projects}
      >
        {ItemRenderer}
      </Grid>
      
      {/* Load more button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Loading...' : 'Load More Projects'}
          </button>
        </div>
      )}
    </div>
  );
};

export default VirtualizedArchive;


