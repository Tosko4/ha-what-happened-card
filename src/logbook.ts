import type { HomeAssistant, LogbookEntry } from "./types";

interface LogbookStreamMessage {
  events: LogbookEntry[];
  start_time?: number;
  end_time?: number;
  partial?: boolean;
}

/**
 * Subscribe to the live logbook stream. The backend first replays history from
 * `startTime` and then pushes new events as they happen.
 */
export function subscribeLogbook(
  hass: HomeAssistant,
  callback: (events: LogbookEntry[]) => void,
  startTime: Date,
  entityIds?: string[],
): Promise<() => void> {
  const message: Record<string, unknown> = {
    type: "logbook/event_stream",
    start_time: startTime.toISOString(),
  };
  if (entityIds && entityIds.length > 0) message.entity_ids = entityIds;
  return hass.connection.subscribeMessage<LogbookStreamMessage>(
    (msg) => callback(msg.events ?? []),
    message,
  );
}
