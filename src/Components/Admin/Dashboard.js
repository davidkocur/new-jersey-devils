import { Button, Stack } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import React from "react";
import AdminLayout from "../../Hoc/AdminLayout";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <AdminLayout title="Dashboard">
        <div className="user_dashboard">
          {/* <div>This is your dashboard</div> */}
          <Stack direction={"row"} columnGap={2} rowGap={2}>
            <Button
              variant="outlined"
              sx={{ px: 3, py: 2 }}
              to="/admin-players/add-player"
              LinkComponent={Link}
              startIcon={<PersonAddIcon />}
            >
              Add player
            </Button>
            <Button
              variant="outlined"
              to="/admin-matches/add-match"
              LinkComponent={Link}
              startIcon={<PlaylistAddIcon />}
            >
              Add match
            </Button>
          </Stack>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Dashboard;
