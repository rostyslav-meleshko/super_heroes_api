import React, { FC } from "react";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

import { FilterDrawer } from "components/FilterSidebar/FilterDrawer";

type FilterSidebarProps = {
  isOpen: boolean;
  handleDrawerToggle: () => void;
};

const FilterSidebar: FC<FilterSidebarProps> = ({
  isOpen,
  handleDrawerToggle,
}) => {
  return (
    <aside aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={isOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <FilterDrawer />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" open>
          <FilterDrawer />
        </Drawer>
      </Hidden>
    </aside>
  );
};

export default FilterSidebar;
