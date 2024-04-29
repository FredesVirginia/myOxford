import { ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/butons/Button";
import { CollapseList } from "../components/lists/CollapseList";

export const HomePage = () => {
  const [openFillInTheBlanks, setOpenFillInTheBlanks] = useState(false);
  const [openMultipleChoice, setOpenMultipleChoice] = useState(false);
  const [openMatchTheColumns, setOpenMatchTheColumns] = useState(false);
  const [openDragAndDrop, setOpenDragAndDrop] = useState(false);
  const [openPickList, setOpenPickList] = useState(false);
  const [openUnscramble, setOpenUnscramble] = useState(false);
  const [openTrueOrFalse, setOpenTrueOrFalse] = useState(false);
  const [openOpen, setOpenOpen] = useState(false);
  const [openSortable, setOpenSortable] = useState(false);
  const [openSpeaking , setOpenSpeaking] = useState(false);

  const navigation = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,100px))] gap-2 p-2">
        <Button
          className="bg-red-400"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Log out   
        </Button>
      </div>
      <div className="flex gap-10 flex-wrap">
        {/* TRUE OR FALSE */}
        <CollapseList open={openTrueOrFalse} setOpen={setOpenTrueOrFalse} title="True or False">
          <ListItemButton onClick={() => navigation("/levels/activities/true-or-false/by-text")}>
            <ListItemText primary="True or False" />
          </ListItemButton>
        </CollapseList>

        {/* UNSCRAMBLE */}
        <CollapseList open={openUnscramble} setOpen={setOpenUnscramble} title="Unscramble">
          <ListItemButton onClick={() => navigation("/levels/activities/unscramble/sentences")}>
            <ListItemText primary="Unscramble" />
          </ListItemButton>
        </CollapseList>

        {/* DRAG AND DROP  */}
        <CollapseList open={openDragAndDrop} setOpen={setOpenDragAndDrop} title="Drag and drop">
          <ListItemButton onClick={() => navigation("/levels/activities/drag-and-drop/image")}>
            <ListItemText primary="Text or image from top to bottom / left to right" />
          </ListItemButton>
          <ListItemButton onClick={() => navigation("/levels/activities/drag-and-drop/a-word")}>
            <ListItemText primary=" Drang a Word " />
          </ListItemButton>

          <ListItemButton onClick={() => navigation("/levels/activities/drag-and-drop/many-words")}>
            <ListItemText primary=" Drang many Word " />
          </ListItemButton>
        </CollapseList>

        {/* PICK LIST */}
        <CollapseList open={openPickList} setOpen={setOpenPickList} title="Pick List">
          <ListItemButton onClick={() => navigation("/levels/activities/picklist/text")}>
            <ListItemText primary="Sentence with posible answers" />
          </ListItemButton>
        </CollapseList>

        {/* MATCH THE COLUMNS */}
        <CollapseList open={openMatchTheColumns} setOpen={setOpenMatchTheColumns} title="Match the columns">
          <ListItemButton onClick={() => navigation("/levels/activities/match-the-columns/text-text")}>
            <ListItemText primary="Text to Text" />
          </ListItemButton>
          <ListItemButton onClick={() => navigation("/levels/activities/match-the-columns/image-text")}>
            <ListItemText primary="Image to Text" />
          </ListItemButton>
          <ListItemButton onClick={() => navigation("/levels/activities/match-the-columns/text-image-text")}>
            <ListItemText primary="Text and image to Text" />
          </ListItemButton>
        </CollapseList>

        {/* FILL IN THE BLANKS */}
        <CollapseList open={openFillInTheBlanks} setOpen={setOpenFillInTheBlanks} title="Fill in the blanks">
          <ListItemButton onClick={() => navigation("/levels/activities/fill-in-the-blanks/word")}>
            <ListItemText primary="Just one word" />
          </ListItemButton>
          <ListItemButton onClick={() => navigation("/levels/activities/fill-in-the-blanks/words")}>
            <ListItemText primary="Multiple words" />
          </ListItemButton>
        </CollapseList>

        {/* MULTIPLE CHOICE */}
        <CollapseList open={openMultipleChoice} setOpen={setOpenMultipleChoice} title="Multiple Choice">
          <ListItemButton onClick={() => navigation("/levels/activities/multiple-choice/text")}>
            <ListItemText primary="Only text answer" />
          </ListItemButton>

          <ListItemButton onClick={() => navigation("/levels/activities/multiple-choice/imagen-text")}>
            <ListItemText primary="Imagen and Txt" />
          </ListItemButton>

          <ListItemButton onClick={() => navigation("/levels/activities/multiple-choice/only-imagen")}>
            <ListItemText primary="Only Imagen" />
          </ListItemButton>
        </CollapseList>

        {/* OPEN */}
        <CollapseList open={openOpen} setOpen={setOpenOpen} title="Open">
          <ListItemButton onClick={() => navigation("/levels/activities/open/text")}>
            <ListItemText primary="Text withou image" />
          </ListItemButton>

          <ListItemButton onClick={() => navigation("/levels/activities/open/imagen")}>
            <ListItemText primary="Text with image" />
          </ListItemButton>
        </CollapseList>

        {/* SORTABLE */}
        <CollapseList open={openSortable} setOpen={setOpenSortable} title="Sortable">
          <ListItemButton onClick={() => navigation("/levels/activities/sortable/image")}>
            <ListItemText primary="Order images" />
          </ListItemButton>
          <ListItemButton onClick={() => navigation("/levels/activities/sortable/word")}>
            <ListItemText primary="Order words" />
          </ListItemButton>
          <ListItemButton onClick={() => navigation("/levels/activities/sortable/text")}>
            <ListItemText primary="Order text" />
          </ListItemButton>
        </CollapseList>

        { /** Speaking */}
        <CollapseList open={openSpeaking} setOpen={setOpenSpeaking} title="Speaking">
          <ListItemButton onClick={() => navigation("/levels/activities/speaking/by-text")}>
            <ListItemText primary="Speaking" />
          </ListItemButton>
        </CollapseList>
      </div>
    </div>
  );
};
