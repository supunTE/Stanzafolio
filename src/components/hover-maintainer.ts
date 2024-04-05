import EventEmitter from "eventemitter3";

export type HoverItemGroup = {
  [key: string]: Set<string>;
};

export class HoverMaintainer {
  static HoverEmitter = new EventEmitter();
  private static hoverItemGroups: HoverItemGroup = {};
  private static hoveredGroup: string | null = null;
  private static clickedGroup: string | null = null;
  private static unsetTimeout: number | null = null;

  /// [register]
  public static registerHoverItem(
    groupName: string,
    itemName: string[] | string
  ): EventEmitter {
    if (!this.hoverItemGroups[groupName]) {
      this.hoverItemGroups[groupName] = new Set();
    }
    if (Array.isArray(itemName)) {
      itemName.forEach((item) => this.hoverItemGroups[groupName].add(item));
    } else {
      this.hoverItemGroups[groupName].add(itemName);
    }

    return this.HoverEmitter;
  }

  public static unregisterHoverItem(
    groupName: string,
    itemName: string[] | string
  ): void {
    if (!this.hoverItemGroups[groupName]) return;
    if (Array.isArray(itemName)) {
      itemName.forEach((item) => this.hoverItemGroups[groupName].delete(item));
    } else {
      this.hoverItemGroups[groupName].delete(itemName);
    }
  }

  public static getRegisteredItems(groupName: string): Set<string> {
    return this.hoverItemGroups[groupName];
  }

  public static getAllRegisteredItems(): HoverItemGroup {
    return this.hoverItemGroups;
  }

  /// [hover]
  public static setHoveredGroup(groupName: string): void {
    console.log("setHoveredGroup", groupName);

    if (this.unsetTimeout) {
      clearTimeout(this.unsetTimeout);
      this.unsetTimeout = null;
      console.log("cleared timeout");
    }

    if (this.hoveredGroup === groupName) return;

    if (!this.hoverItemGroups[groupName])
      throw new Error(`Group ${groupName} is not registered`);
    this.hoveredGroup = groupName;

    this.HoverEmitter.emit("hoveredGroupChanged", groupName);
  }

  public static getHoveredGroup(): string | null {
    return this.hoveredGroup;
  }

  public static unsetHoveredGroup(): void {
    console.log("unsetHoveredGroup");

    if (this.unsetTimeout) {
      clearTimeout(this.unsetTimeout);
      this.unsetTimeout = null;
      console.log("cleared timeout");
    }

    this.unsetTimeout = setTimeout(() => {
      this.hoveredGroup = null;
      this.HoverEmitter.emit("hoveredGroupChanged", null);
    }, 100);
  }

  public static isHovered(itemName: string): boolean {
    if (!this.hoveredGroup) return false;
    return this.hoverItemGroups[this.hoveredGroup].has(itemName);
  }

  /// [click]
  public static setClickedGroup(groupName: string): void {
    if (this.clickedGroup === groupName) {
      return this.unsetClickedGroup();
    }

    console.log("👆🏻 setClickedGroup", groupName);
    this.clickedGroup = groupName;

    this.HoverEmitter.emit("clickedGroupChanged", groupName);
  }

  public static getClickedGroup(): string | null {
    return this.clickedGroup;
  }

  public static unsetClickedGroup(): void {
    console.log("👆🏻✖️ unsetClickedGroup");
    this.clickedGroup = null;

    this.HoverEmitter.emit("clickedGroupChanged", null);
  }

  public static isClicked(itemName: string): boolean {
    if (!this.clickedGroup) return false;
    return this.hoverItemGroups[this.clickedGroup].has(itemName);
  }

  public static checkForClickedGroups(groupNames: string[]): boolean {
    const isGroupClicked = groupNames.some((groupName) => {
      return HoverMaintainer.clickedGroup === groupName;
    });

    return isGroupClicked;
  }
}
