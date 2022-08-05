import { BaseFeature } from './BaseFeature'

export type BuildingItem = {
  /**
   * 楼层号，例如十层 10，地下一层 -1
   */
  floor: number
  /**
   * 楼层对应的 ASE 实体 eid
   */
  eid: string
  /**
   * 楼层别名，可选
   */
  alias?: string
}

/**
 * 建筑物功能
 *
 * @enhance 增强功能
 */
export class Building extends BaseFeature {
  private get _sceneEdit() {
    return this._digm.sceneEdit
  }

  private _buildingMap = new Map<string, BuildingItem[]>()

  /**
   * 添加建筑物定义
   *
   * 将一组 ASE 实体定义为一个建筑物
   *
   * @enhance
   */
  addBuilding(name: string, items: BuildingItem[]) {
    if (this._buildingMap.has(name)) throw new Error(`Building named '${name}' already exists`)
    this.setBuilding(name, items)
  }

  /**
   * 修改建筑物定义
   *
   * 将一组 ASE 实体定义为一个建筑物
   *
   * @enhance
   */
  setBuilding(name: string, items: BuildingItem[]) {
    this._buildingMap.set(name, this._sortBuildingItems(items))
  }

  /**
   * 移除建筑物定义
   *
   * @enhance
   */
  removeBuilding(name: string) {
    return this._buildingMap.delete(name)
  }

  /**
   * 显示整个建筑物
   *
   * @enhance
   */
  showBuilding(name: string) {
    const items = this._getBuildingItemsRequireDefine(name)
    return this._toggleBuildingItemsVisible(items, true)
  }

  /**
   * 隐藏整个建筑物
   *
   * @enhance
   */
  hideBuilding(name: string) {
    const items = this._getBuildingItemsRequireDefine(name)
    return this._toggleBuildingItemsVisible(items, false)
  }

  /**
   * 显示一个建筑物的目标楼层
   *
   * @enhance
   */
  showTargetFloor(name: string, floor: number) {
    const items = this._getBuildingItemsRequireDefine(name)
    const showItems = this._filterBuildItems(items, (item) => item.floor === floor)
    return this._toggleBuildingItemsVisible(showItems, true)
  }

  /**
   * 显示一个建筑物的目标楼层，该建筑物的其它楼层将被隐藏
   *
   * @enhance
   */
  showTargetFloorOnly(name: string, floor: number) {
    this.hideBuilding(name)
    return this.showTargetFloor(name, floor)
  }

  /**
   * 隐藏一个建筑物的目标楼层
   *
   * @enhance
   */
  hideTargetFloor(name: string, floor: number) {
    const items = this._getBuildingItemsRequireDefine(name)
    const hideItems = this._filterBuildItems(items, (item) => item.floor === floor)
    return this._toggleBuildingItemsVisible(hideItems, false)
  }

  /**
   * 隐藏一个建筑物的目标楼层，该建筑物的其它楼层将被显示
   *
   * @enhance
   */
  hideTargetFloorOnly(name: string, floor: number) {
    this.showBuilding(name)
    return this.hideTargetFloor(name, floor)
  }

  /**
   * 显示一个建筑物的目标楼层以下
   *
   * 例如有三层楼，传入 2，[1,2] 显示，[3] 隐藏
   * @enhance
   */
  showTargetFloorBelow(name: string, floor: number) {
    const items = this._getBuildingItemsRequireDefine(name)
    const showItems = this._filterBuildItems(items, (item) => item.floor <= floor)
    const hideItems = this._filterBuildItems(items, (item) => item.floor > floor)
    return Promise.all([
      this._toggleBuildingItemsVisible(showItems, true),
      this._toggleBuildingItemsVisible(hideItems, false),
    ])
  }

  /**
   * 显示一个建筑物的目标楼层以上
   *
   * 例如有三层楼，传入 2，[2,3] 显示，[1] 隐藏
   * @enhance
   */
  showTargetFloorAbove(name: string, floor: number) {
    const items = this._getBuildingItemsRequireDefine(name)
    const showItems = this._filterBuildItems(items, (item) => item.floor >= floor)
    const hideItems = this._filterBuildItems(items, (item) => item.floor < floor)
    return Promise.all([
      this._toggleBuildingItemsVisible(showItems, true),
      this._toggleBuildingItemsVisible(hideItems, false),
    ])
  }

  /**
   * 隐藏一个建筑物的目标楼层以下
   *
   * 例如有三层楼，传入 2，[1,2] 隐藏，[3] 显示
   * @enhance
   */
  hideTargetFloorBelow(name: string, floor: number) {
    const items = this._getBuildingItemsRequireDefine(name)
    const hideItems = this._filterBuildItems(items, (item) => item.floor <= floor)
    const showItems = this._filterBuildItems(items, (item) => item.floor > floor)
    return Promise.all([
      this._toggleBuildingItemsVisible(hideItems, false),
      this._toggleBuildingItemsVisible(showItems, true),
    ])
  }

  /**
   * 隐藏一个建筑物的目标楼层以上
   *
   * 例如有三层楼，传入 2，[2,3] 隐藏，[1] 显示
   * @enhance
   */
  hideTargetFloorAbove(name: string, floor: number) {
    const items = this._getBuildingItemsRequireDefine(name)
    const hideItems = this._filterBuildItems(items, (item) => item.floor >= floor)
    const showItems = this._filterBuildItems(items, (item) => item.floor < floor)
    return Promise.all([
      this._toggleBuildingItemsVisible(hideItems, false),
      this._toggleBuildingItemsVisible(showItems, true),
    ])
  }

  /**
   * 切换一组 BuildingItem[] 的显示/隐藏
   */
  private _toggleBuildingItemsVisible(items: BuildingItem[], visible: boolean) {
    const eids = items.map((item) => item.eid)
    return this._sceneEdit.showHideAESObject({ eid: eids, bshow: visible })
  }

  /**
   * 对 BuildingItem[] 按照 floor 从小到大排序
   */
  private _sortBuildingItems(items: BuildingItem[]) {
    return [...items].sort((a, b) => a.floor - b.floor)
  }

  private _getBuildingItemsRequireDefine(name: string) {
    if (!this._buildingMap.has(name))
      throw new Error(`Building named '${name}' not exists, please define first`)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._buildingMap.get(name)!
  }

  private _filterBuildItems(items: BuildingItem[], filter: (item: BuildingItem) => boolean) {
    return items.filter(filter)
  }
}
