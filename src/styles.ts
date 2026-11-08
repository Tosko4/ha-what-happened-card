import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    height: 100%;
    container-type: inline-size;
    container-name: wh;
  }
  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    --wh-node: 36px;
    --wh-icon: 24px;
    --wh-surface: var(--ha-card-background, var(--card-background-color, #fff));
  }
  ha-card.compact {
    --wh-node: 28px;
    --wh-icon: 18px;
  }
  .card-header {
    flex: none;
  }
  .scroll {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    max-height: var(--wh-max-height, none);
    padding: 0 var(--ha-space-4, 16px) var(--ha-space-2, 8px);
    overscroll-behavior: contain;
  }
  ha-card:not(.has-header) .scroll {
    padding-top: var(--ha-space-2, 8px);
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Day headers */
  .day {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: var(--ha-space-3, 12px);
    padding: var(--ha-space-2, 8px) 0;
    background: var(--wh-surface);
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-m, 14px);
    font-weight: 500;
    line-height: 20px;
  }
  .day::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--divider-color);
  }

  /* Entries */
  .item {
    display: grid;
    grid-template-columns: var(--wh-node) minmax(0, 1fr);
    column-gap: var(--ha-space-3, 12px);
  }
  .rail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: var(--ha-space-1, 4px);
  }
  .line {
    flex: 1;
    width: 2px;
    min-height: 8px;
    margin-top: var(--ha-space-1, 4px);
    border-radius: 1px;
    background: var(--divider-color);
  }
  .item.last .line {
    visibility: hidden;
  }
  .node {
    position: relative;
    flex: none;
    display: grid;
    place-items: center;
    width: var(--wh-node);
    height: var(--wh-node);
    border-radius: 50%;
    box-sizing: border-box;
    background: color-mix(in srgb, var(--accent) 20%, transparent);
    color: var(--accent);
    --mdc-icon-size: var(--wh-icon);
  }
  .node ha-icon {
    display: flex;
    width: var(--wh-icon);
    height: var(--wh-icon);
  }
  .node.photo {
    background: none;
  }
  .photo-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .badge {
    position: absolute;
    right: -4px;
    bottom: -4px;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid var(--wh-surface);
    overflow: hidden;
    display: grid;
    place-items: center;
    background: var(--chip);
    color: var(--text-primary-color, #fff);
    font-size: 9px;
    font-weight: 600;
    line-height: 1;
  }
  .badge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin: 0 calc(-1 * var(--ha-space-2, 8px)) var(--ha-space-3, 12px);
    padding: var(--ha-space-1, 4px) var(--ha-space-2, 8px);
    border-radius: var(--ha-border-radius-lg, 12px);
    min-width: 0;
    outline: none;
    transition: background-color 120ms ease;
  }
  .row.clickable {
    cursor: pointer;
  }
  .row.clickable:hover {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  }
  .row.clickable:focus-visible {
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  .body {
    min-width: 0;
    flex: 1;
  }
  .sentence {
    font-size: 14px;
    line-height: 20px;
    color: var(--primary-text-color);
    overflow-wrap: anywhere;
  }
  .subject {
    font-weight: 500;
  }
  .count {
    display: inline-block;
    margin-left: 6px;
    padding: 0 7px;
    border-radius: 9px;
    background: color-mix(in srgb, var(--accent) 20%, transparent);
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-s, 12px);
    font-weight: 500;
    line-height: 18px;
    vertical-align: 1px;
  }
  .cause {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 6px;
    margin-top: 4px;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 18px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    max-width: 100%;
    box-sizing: border-box;
    padding: 2px var(--ha-space-2, 8px) 2px var(--ha-space-1, 4px);
    border: 1px solid var(--divider-color);
    border-radius: var(--ha-border-radius-pill, 9999px);
    background: transparent;
    color: var(--primary-text-color);
    font: inherit;
    font-size: 12px;
    line-height: 18px;
    --mdc-icon-size: 14px;
  }
  .chip ha-icon {
    color: var(--chip);
    display: inline-flex;
  }
  .chip .avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    object-fit: cover;
    flex: none;
  }
  .chip .initial {
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex: none;
    background: var(--chip);
    color: var(--text-primary-color, #fff);
    font-size: 10px;
    font-weight: 600;
  }
  .chip .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  button.chip {
    cursor: pointer;
  }
  button.chip:hover {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  }
  button.chip:focus-visible {
    outline: 2px solid var(--primary-color);
  }

  .time {
    flex: none;
    text-align: right;
    font-size: 12px;
    line-height: 18px;
    color: var(--secondary-text-color);
    padding-top: 1px;
  }
  .time .abs {
    display: block;
    color: var(--primary-text-color);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .state {
    padding: 32px 8px;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 14px;
  }
  .state ha-icon {
    display: block;
    margin: 0 auto 8px;
    --mdc-icon-size: 36px;
    color: var(--disabled-text-color);
  }
  .state.error {
    color: var(--error-color);
  }

  ha-card.compact .sentence {
    font-size: 13px;
    line-height: 18px;
  }
  ha-card.compact .row {
    margin-bottom: 6px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  ha-card.compact .cause {
    margin-top: 2px;
  }
  ha-card.compact .badge {
    width: 14px;
    height: 14px;
    right: -3px;
    bottom: -3px;
  }

  @container wh (max-width: 340px) {
    .row {
      flex-direction: column;
      gap: 2px;
    }
    .time {
      display: flex;
      gap: 6px;
      text-align: left;
      padding-top: 0;
    }
    .time .abs {
      display: inline;
    }
    .item {
      column-gap: 10px;
    }
  }
`;
