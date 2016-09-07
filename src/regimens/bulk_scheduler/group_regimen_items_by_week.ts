import { Week } from "./interfaces";
import { Sequence } from "../../sequences/interfaces";
import { RegimenItem } from "../../regimens/interfaces";

/** Calculates correct time_offset for a group of RegimenItem[]s based on a set of weeks
 *  and a desired offset. */
export function groupRegimenItemsByWeek(weeks: Week[], OFFSET: number, seq: Sequence) {
        const ONE_WEEK = 604800000;
        const ONE_DAY = 86400000;

        let keys = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];

        return weeks
        // Collect all of the true/false values in weekX.days. These indicate
        // wether we should add a sequence on that day or not.
        .map((week) =>
            keys.map((key) =>
                week.days[key])) // [[true,false,false,true] . . . ]
        // Convert true values to an offset, in milliseconds from the start point.
        // Convert false values to -1.
        .map((weekArray, weekNum) => {
            let weeks = ONE_WEEK * (weekNum);
            return weekArray.map((shouldExecute, dayNum) => {
                let days = ONE_DAY * (dayNum + 1);
                return (shouldExecute) ? (weeks + days + OFFSET) : -1; // lol, In band signaling.
            });
        })// [[-1, 99999, -1, -1],[.....]]
        // "flatten" the array into a 1d structure (its an array of
        // number arrays right now)
        .reduce((arr, acc) => acc.concat(arr))
        // Remove -1 values (days that don't execute a sequence).
        .filter((i) => i !== -1)
        // sort (duh)
        .sort()
        // Transform the sorted array of values into a regimenItem[] array.
        .map<RegimenItem>((time_offset) => {
            if (seq) {
                let sequence = seq && _.cloneDeep<Sequence>(seq);
                return { time_offset, sequence };
            } else {
                // Typescript type check acts funny as of TSC 2.0
                // Maybe we can delete this some day?
                throw new Error("You should never see this.");
            };
        });
}