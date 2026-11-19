# Work popup slides

`build.py` writes one HTML page per project slide. To change a slide, edit its
section in `build.py`, then run:

    python build.py
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1600,800 --virtual-time-budget=6000 --screenshot=cdl-architecture.png cdl-architecture.html

and copy the PNG into `public/work/`. Pages: cdl-architecture, remediation-progress,
failure-modes, pmo-stage-gates, copilot-agent, draft-board. The draft-board slide uses
`draft/board-shot.png`, a screenshot of The Two-Flex Board artifact.
